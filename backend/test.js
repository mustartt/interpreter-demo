const cp = require('child_process')

var proc = cp.spawn('python', ['test.py']);


proc.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

proc.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

proc.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

proc.on('error', (err) => {
   console.log("Error" + err );
});



// write to 
proc.stdin.write("Echo\n")
proc.stdin.write("Echo 1\n")
proc.stdin.write("Echo 2\n")

proc.stdin.write("quit()\n")

//proc.stdin.end();
