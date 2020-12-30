import React from 'react';

import styles from './Header.css'

class Header extends React.Component {

	render() {
		return (
			<div className="header-area">
				<h1>Functional Interpreter</h1>
				<button className="btn button run" onClick={this.props.execute}>Execute</button>
				<button className="btn button res" onClick={this.props.reset}>Reset</button>
			</div>
			);
	}
}

export default Header;