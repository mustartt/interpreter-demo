import React from 'react';
import Editor from 'react-simple-code-editor';
import {highlight, languages} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';

import styles from './App.css'

// Import Components
import OutputConsole from './components/OutputConsole'
import Header from './components/Header'


const tempcode = `function add(a, b) {
  return a + b;
}`;

const tempout = 'Welcome to <Lang> Interpreter v0.1.'


class App extends React.Component {

  state = { code: tempcode, output: tempout };
  
  constructor(props) {
    super(props)

    this.execute = this.execute.bind(this);
    this.reset = this.reset.bind(this); 
  }

  execute() {
    // send POST request
    fetch('http://localhost:5000/api', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: this.state.code
      })
    })
    .then((res) => res.json())
    .then((json) => {
      console.log("Program Output: " + (json.err ? "Failure" : "Success"))
      console.log(json.output)
      this.setState({ code: this.state.code, output: json.output })
    })
  }

  reset() {
    this.setState({ code: tempcode, output: this.state.output })
  }

  render() {
    //console.log(highlight(this.state.code, languages.js));
    return (
      <div className="container">

        <Header execute={this.execute} reset={this.reset} />

        <div className="row">
            <Editor 
              className="col-sm-6 code-editor"
              value={this.state.code}
              onValueChange={code => this.setState({ code })}
              highlight={code => highlight(code, languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
              }}
            />

            <OutputConsole output={this.state.output}/>
            
        </div>
      </div>
    );
  }
}

export default App;
