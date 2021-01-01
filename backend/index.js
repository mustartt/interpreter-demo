const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const cp = require('child_process')
const http = require('http')

const PORT = process.env.PORT || 5000;

// Express Application
var app = express();

// Setup Socket Connections
const server = http.createServer(app)
const socketIo = require('socket.io')
const io = socketIo(server, {
	cors: {
    	origin: "*",
    	methods: ["GET", "POST"]
    }
  })

// cors options
app.options('/api', cors())

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

/* === Interactive REPL Handler === */
// app.use('/static', express.static('node_modules'));

io.on('connection', (socket) => {
	console.log('Established a connection. Spawning DEBUG interpreter.')

	// spawn sync
	interp = cp.spawn('python', ['test.py'])

	/* Forward interpreter output to client*/
	interp.stdout.on('data', (data) => {
		//console.log(data.toString())
		socket.emit('msg_repl', data.toString());
	});

	interp.stderr.on('data', (data) => {
		//console.log(data.toString())
		socket.emit('msg_repl', data.toString());
	});

	// send client command to interpreter 
	socket.on('msg_client', (data) => {
		console.log("Client sent " + data)
		interp.stdin.write(data + '\n')
		// the output should be piped to stdout or stderr
	});

	/* Handle closing events */
	interp.on('close', (code) => {
	  socket.emit('msg_repl', `The interpreter exited with code ${code}.`);
	});

	interp.on('error', (err) => {
	   socket.emit('msg_repl', "Error" + err );
	});

	socket.on('disconnect', () => {
		console.log('Client disconnected killing child child process.')
		interp.kill()
	});
})


/* === File Execution Handler === */

// custom functions
const env_path = './environment/'

// random name function
function getRandomName() {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < 12; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

app.post('/api', cors(), (req, res) => {
	// get the body of the request
	var code = req.body.code;
	// generate random file name
	var filename = getRandomName() + '.lang';
	// write file
	fs.writeFile(env_path + filename, code, (err, data) => {
		if (err) {
			console.log(err);
		}
		// generate system command
		// TODO: Fix the subdir problem
		var command = 'environment\\interp.exe environment\\' + filename;
		// execute interpreter command
		cp.exec(command, (err, stdout, stderr) => {
			// send result back
			if (stderr) {
				res.json({output: stderr, err: true})
			} else {
				res.json({output: stdout, err: false});
			}

			// delete file
			fs.unlink(env_path + filename, (err) => {
				if (err) { console.log(err) }
			});
		});
	});
});


//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.status(404);
});

server.listen(PORT, () => {
	console.log('socket is listening on port ' + PORT)
});


