import React from 'react';
import styles from './OutputConsole.css'

class OutputConsole extends React.Component {
	render() {
		return (
			<div className="console-output">
				<div className="console-text">
					{this.props.output}
				</div>
			</div>
		);
	}
}

export default OutputConsole