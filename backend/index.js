var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var sys = require('child_process')

// Express Application
var app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 



app.get('/', (req, res) => {
	// TODO: Implement React Build File
	res.send('Hello World!');
});



// custom functions
const env_path = './environment/'

// random name function
function getRandomName() {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < 12; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

app.post('/api', (req, res) => {
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
		sys.exec(command, (err, stdout, stderr) => {
			if (err) { console.log() }
			if (stderr) { console.log(stderr) }

			// send result back
			res.send(stdout);

			// delete file
			fs.unlink(env_path + filename, (err) => {
				if (err) { console.log(err) }
			})
		});
	});
});


//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.status(404);
});

app.listen(5000, () =>
  console.log('Example app listening on port 5000.'),
);