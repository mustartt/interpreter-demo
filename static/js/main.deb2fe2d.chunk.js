(this["webpackJsonpinterpreter-demo"]=this["webpackJsonpinterpreter-demo"]||[]).push([[0],{50:function(e,t,n){},55:function(e,t,n){},56:function(e,t,n){},57:function(e,t,n){},58:function(e,t,n){},89:function(e,t,n){"use strict";n.r(t);var s=n(0),a=n(1),c=n.n(a),o=n(42),i=n.n(o),r=(n(50),n(6)),l=n(7),u=n(10),h=n(9),p=n(8),d=n(43),b=n.n(d),j=n(26),O=(n(51),n(52),n(53),n(54),n(55),n(56),function(e){Object(h.a)(n,e);var t=Object(p.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(s.jsx)("div",{className:"console-output",children:Object(s.jsx)("div",{className:"console-text",children:this.props.output})})}}]),n}(c.a.Component)),f=(n(57),function(e){Object(h.a)(n,e);var t=Object(p.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(s.jsxs)("div",{className:"header-area",children:[Object(s.jsxs)("h1",{children:["The ",Object(s.jsx)("span",{className:"sf",children:"\u03bb"})," Interpreter"]}),Object(s.jsxs)("div",{className:"header-desc",children:["A Functional Programming Language Interpreter written in Python. The fundamental idea of this language is to express the functional nature of the language, as every function is a ",Object(s.jsx)("span",{className:"sf",children:"\u03bb"})," expression bound to an identifier."]}),Object(s.jsx)("br",{}),Object(s.jsxs)("button",{className:"button run",onClick:this.props.execute,children:[Object(s.jsx)("img",{src:"./assets/caret-right-fill.svg",width:"20",height:"20"}),Object(s.jsx)("span",{children:" Run"})]}),Object(s.jsxs)("button",{className:"button res",onClick:this.props.reset,children:[Object(s.jsx)("img",{src:"./assets/arrow-clockwise.svg",width:"20",height:"20"}),Object(s.jsx)("span",{children:" Reset"})]}),Object(s.jsxs)("button",{className:"button github",children:[Object(s.jsx)("img",{src:"./assets/github.svg",width:"20",height:"20"}),Object(s.jsx)("span",{children:Object(s.jsx)("a",{href:"https://github.com/mustartt/functional-interpreter",children:" Github"})})]})]})}}]),n}(c.a.Component)),m=(n(58),function(e){Object(h.a)(n,e);var t=Object(p.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"enterPressed",value:function(e){if(13===(e.keyCode||e.which)){var t=e.target.value;this.props.sendHandler(t),e.target.value=""}}},{key:"render",value:function(){return Object(s.jsxs)("div",{className:"repl-pane",children:[this.props.log,Object(s.jsx)("input",{id:"repl-input",type:"text",onKeyPress:this.enterPressed.bind(this),autocomplete:"off"})]})}}]),n}(c.a.Component)),g=n(44),v=n.n(g),x="\nload lang/higher-order.lang;\n\n# fib(n) recursively computes the n-th fibonacci number\n# fib: Nat -> Nat\nbind fib = lambda({n} -> \n  if(<=(n 1)\n    n\n    +(fib(-(n 1)) \n      fib(-(n 2)))));\n\n# function evaluation\nfib(10);\n\n# example for higher-order functions\nreduce(+ 0 map(fib list(1 2 3 4 5 6 7 8 9 10)));\n",k="Welcome to The \u03bb Interpreter [version 0.1].\n\u03bb ";var y=function(e){Object(h.a)(n,e);var t=Object(p.a)(n);function n(e){var s;return Object(r.a)(this,n),(s=t.call(this,e)).state={code:x,output:k,log:"",panel:"repl",response:""},s.execute=s.execute.bind(Object(u.a)(s)),s.reset=s.reset.bind(Object(u.a)(s)),s.sendCommand=s.sendCommand.bind(Object(u.a)(s)),s.socket=v()("https://interpreter-demo.herokuapp.com/"),s.changeToOutput=s.changeToOutput.bind(Object(u.a)(s)),s.changeToREPL=s.changeToREPL.bind(Object(u.a)(s)),s}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;console.log("App mounted. Creating Socket"),this.socket.on("msg_repl",(function(t){console.log(t),e.setState({response:e.state.response+"\n"+t})}))}},{key:"sendCommand",value:function(e){"clear"!==e?(this.setState({response:this.state.response+e}),this.socket.emit("msg_client",e)):this.setState({response:"> "})}},{key:"execute",value:function(){var e=this;this.changeToOutput(),fetch("https://interpreter-demo.herokuapp.com/api",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({code:this.state.code})}).then((function(e){return e.json()})).then((function(t){console.log("Program Output: "+(t.err?"Failure":"Success")),console.log(t.output),e.setState({code:e.state.code,output:k+"interperter input.lang\n"+t.output})}))}},{key:"reset",value:function(){this.setState({code:x,output:k})}},{key:"changeToOutput",value:function(){this.setState({panel:"output"})}},{key:"changeToREPL",value:function(){this.setState({panel:"repl"})}},{key:"render",value:function(){var e=this;return Object(s.jsxs)("div",{className:"container full-height",children:[Object(s.jsx)(f,{execute:this.execute,reset:this.reset}),Object(s.jsxs)("div",{className:"row fluid-height",children:[Object(s.jsx)("div",{className:"col-lg-6",children:Object(s.jsx)("div",{className:"code-area dropshadow",children:Object(s.jsx)(b.a,{className:"code-editor",value:this.state.code,onValueChange:function(t){return e.setState({code:t})},highlight:function(e){return function(e){var t=Object(j.highlight)(e,j.languages.python);return(t=(t=(t=t.replace("bind",'<span class="token keyword">bind</span>')).replace("local",'<span class="token keyword">local</span>')).replace("load",'<span class="token keyword">load</span>')).replace("\u03bb",'<span class="token keyword">\u03bb</span>')}(e)},padding:10,style:{fontFamily:'"Fira code", "Fira Mono", monospace',fontSize:12}})})}),Object(s.jsx)("div",{className:"col-lg-6",children:Object(s.jsxs)("div",{class:"console-area dropshadow",children:[Object(s.jsxs)("div",{className:"tab-container",children:[Object(s.jsx)("button",{className:"tab dropshadow "+("repl"===this.state.panel?"active":""),onClick:this.changeToREPL,children:"REPL"}),Object(s.jsx)("button",{className:"tab dropshadow "+("repl"===this.state.panel?"":"active"),onClick:this.changeToOutput,children:"Output"})]}),"repl"===this.state.panel?Object(s.jsx)(m,{sendHandler:this.sendCommand,log:this.state.response}):Object(s.jsx)(O,{output:this.state.output})]})})]})]})}}]),n}(c.a.Component);i.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(y,{})}),document.getElementById("root"))}},[[89,1,2]]]);
//# sourceMappingURL=main.deb2fe2d.chunk.js.map