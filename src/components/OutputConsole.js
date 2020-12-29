import React from 'react';
import styles from './OutputConsole.css'

const output = 'Welcome to <Lang> Interpreter v0.1. >'


class OutputConsole extends React.Component {

	state = { output }

	render() {
		return (
			<div className="console-output col-sm-6">
				{this.state.output}
			</div>
			);
	}
}

export default OutputConsole