import React from 'react';
import styles from './OutputConsole.css'

class OutputConsole extends React.Component {
	render() {
		return (
			<div className="console-output col-sm-6">
				{this.props.output}
			</div>
			);
	}
}

export default OutputConsole