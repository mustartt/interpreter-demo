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
import REPL from './components/REPL'

import socketIOClient from "socket.io-client";
const ENDPOINT = "https://interpreter-demo.herokuapp.com/";

const tempcode = 
`
load lang/higher-order.lang;

# fib(n) recursively computes the n-th fibonacci number
# fib: Nat -> Nat
bind fib = lambda({n} -> 
  if(<=(n 1)
    n
    +(fib(-(n 1)) 
      fib(-(n 2)))));

# function evaluation
fib(10);

# example for higher-order functions
reduce(+ 0 map(fib list(1 2 3 4 5 6 7 8 9 10)));
`;

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

  state = { 
    code: tempcode, 
    output: tempout,
    log: '',
    panel: 'repl', // 'repl' or 'output'
    response: ''
    };

  constructor(props) {
    super(props)

    // console.log(highlight(tempcode))

    this.execute = this.execute.bind(this);
    this.reset = this.reset.bind(this); 
    this.sendCommand = this.sendCommand.bind(this);

    // setup socket
    this.socket = socketIOClient(ENDPOINT);

    // setup buttons
    this.changeToOutput = this.changeToOutput.bind(this)
    this.changeToREPL = this.changeToREPL.bind(this) 
  }

  componentDidMount() {
    console.log('App mounted. Creating Socket')
    // setup message handler
    this.socket.on("msg_repl", data => {
      console.log(data)
      // update state

      this.setState({response: this.state.response + '\n' + data})
    });
  }

  sendCommand(command) {
    if (command === "clear") {
      this.setState({response: '> '})
      return
    }

    this.setState({response: this.state.response + command})
    this.socket.emit('msg_client', command)
  }
  
  execute() {
    // swtich view to output
    this.changeToOutput()

    // send POST request
    fetch('https://interpreter-demo.herokuapp.com/api', {
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

  changeToOutput() {
    this.setState({ panel: 'output' })
  } 

  changeToREPL() {
    this.setState({ panel: 'repl' })
  }

  render() {
    //console.log(highlight(this.state.code, languages.js));
    return (
      <div className="container full-height">

        <Header execute={this.execute} reset={this.reset} />

        <div className="row fluid-height">
          <div className="col-lg-6">
            <div className="code-area dropshadow">
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

          <div className="col-lg-6">
            <div class="console-area dropshadow">
              <div className="tab-container">
                <button 
                  className={"tab dropshadow " + ((this.state.panel === 'repl') ? 'active' : '')}
                  onClick={this.changeToREPL}
                  >REPL</button>
                <button 
                  className={"tab dropshadow " + ((this.state.panel === 'repl') ? '' : 'active')}
                  onClick={this.changeToOutput}
                  >Output</button>
              </div>
              
              { (this.state.panel === 'repl') ? 
                <REPL sendHandler={this.sendCommand} log={this.state.response}/> :
                <OutputConsole output={this.state.output}/> }

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
