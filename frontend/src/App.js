import React from 'react';
import Editor from 'react-simple-code-editor';
import {highlight, languages} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-python'

import styles from './App.css'

// Import Components
import OutputConsole from './components/OutputConsole'
import Header from './components/Header'


const tempcode = 
`# fib(n) recursively computes the n-th fibonacci number
# fib: Nat -> Nat
bind fib = lambda({n} -> 
  if(<=(n 1)
    n
    +(fib(-(n 1)) 
      fib(-(n 2)))));

# function evaluation
fib(0);
fib(5);
fib(10);`;

const tempout = 
`Welcome to The λ Interpreter [version 0.1].\nλ `


function highcust(program) {
  var temp = highlight(program, languages.python)
  temp = temp.replace('bind', '<span class="token keyword">bind</span>')
  temp = temp.replace('local', '<span class="token keyword">local</span>')
  temp = temp.replace('load', '<span class="token keyword">load</span>')
  temp = temp.replace('λ', '<span class="token keyword">λ</span>')
  return temp
}

class App extends React.Component {

  state = { code: tempcode, output: tempout };
  
  constructor(props) {
    super(props)

    // console.log(highlight(tempcode))

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
      this.setState({ code: this.state.code, 
        output: tempout + 'interperter input.lang\n' + json.output })
    })
  }

  reset() {
    this.setState({ code: tempcode, output: tempout })
  }

  render() {
    //console.log(highlight(this.state.code, languages.js));
    return (
      <div className="container full-height">

        <Header execute={this.execute} reset={this.reset} />

        <div className="row fluid-height">
          <div className="col-lg-6">
            <div className="code-area">
              <Editor 
                className="code-editor"
                value={this.state.code}
                onValueChange={code => this.setState({ code })}
                highlight={code => highcust(code)}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                }}
              />
            </div>
          </div>

          <OutputConsole output={this.state.output}/>
            
        </div>
      </div>
    );
  }
}

export default App;
