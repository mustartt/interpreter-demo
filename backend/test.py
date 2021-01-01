import sys

# echo loop
command = sys.stdin.readline()

while not command.startswith('quit()'):
	# echo command
	sys.stdout.write(command)
	sys.stdout.flush()
	

	command = sys.stdin.readline()