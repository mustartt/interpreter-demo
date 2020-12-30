import React from 'react';
import styles from './OutputConsole.css'

class OutputConsole extends React.Component {
	render() {
		return (
			<div className="console-output col-lg-6">
				<div className="console-text">
					{this.props.output}
				</div>
			</div>
			);
	}
}

export default OutputConsole