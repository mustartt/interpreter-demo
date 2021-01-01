import React from 'react';

import './REPL.css'

class REPL extends React.Component {

	enterPressed(event) {
		var code = event.keyCode || event.which;
		// check for enter key
		if (code === 13) {
			var text = event.target.value
			// TODO: Preprocess and check for enter on a new line

			// send off to App.js for processing
			this.props.sendHandler(text)
			// reset input field
			event.target.value = ""
		}
	}

	render() {
		return (
			<div className="repl-pane">
				{this.props.log}
				<input id='repl-input'
					type="text" 
					onKeyPress={this.enterPressed.bind(this)}
					autocomplete="off"></input>
			</div>
		);
	}
}

export default REPL;