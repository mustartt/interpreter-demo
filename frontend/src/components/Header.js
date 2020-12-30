import React from 'react';

import styles from './Header.css'

// λ

class Header extends React.Component {
	render() {
		return (
			<div className="header-area">
				<h1>The <span className="sf">λ</span> Interpreter</h1>

				<div className="header-desc">A Functional Programming Language 
					Interpreter written in Python. 
					The fundamental idea of this language is to express the functional 
					nature of the language, as every function is
					a <span className="sf">λ</span> expression bound to an identifier.</div>

				<br></br>

				<button className="button run" onClick={this.props.execute}>
					<img src="./assets/caret-right-fill.svg" width="20" height="20"></img>
					<span> Run</span>
				</button>
				<button className="button res" onClick={this.props.reset}>
					<img src="./assets/arrow-clockwise.svg" width="20" height="20"></img>
					<span> Reset</span>
				</button>
				<button className="button github">
					<img src="./assets/github.svg" width="20" height="20"></img>
					<span>
						<a href="https://github.com/mustartt/functional-interpreter"> Github</a>
					</span>
				</button>
			</div>
			);
	}
}

export default Header;