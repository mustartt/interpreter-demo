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
}
`;


const tempout = 'Welcome to <Lang> Interpreter v0.1.'


 
class App extends React.Component {
  state = { code: tempcode, output: tempout };
 
  render() {
    //console.log(highlight(this.state.code, languages.js));
    return (
      <div className="container">

        <Header />

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
