import sys

# python buffers stdout -> flush on message
def put(text: str) -> None:
	sys.stdout.write(text)
	sys.stdout.flush()

# testing REPL
prompt = '> '

put("Welcome to TESTING Interpreter!\n" + prompt)
command = sys.stdin.readline()

# echo loop
while not command.startswith('quit()'):
	# echo command
	put('echo: ' + command)
	put(prompt)

	command = sys.stdin.readline()


