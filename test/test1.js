const chalk = require('chalk')


function logResult(result, expectation, message) {
  if (result == expectation) {
    console.log(chalk.green(message))
  } else {
    console.log(chalk.red(message))
  }
}


function testTransition(to, expectation) {
  let from = S.state.name
  
  S.goto(to)

  let result = S.inState(to) && S.hasTransition(from, to)
  
  logResult(result, expectation, `transition from ${from} to ${to}: ${expectation? 'good': 'not good'}`)
}


const StateMachine = require('.')

const O = {}
const S = new StateMachine(O)


// S.verbose = true


// HOW-TO setup states
S
.addState('one', {
  name: 'one',
  onEnter: ()=>{
    console.log('enter state 1')
  },
  onExit: ()=>{
    console.log('exit state 1')
  },
  onUpdate: ()=>{
    console.log('update state 1')
  },
})
.addState('two', {
  name: 'two',
  onEnter: ()=>{
    console.log('enter state 2')
  },
  onExit: ()=>{
    console.log('exit state 2')
  },
  onUpdate: ()=>{
    console.log('update state 2')
  },
})
.addState('three', {
  name: 'three',
  onEnter: ()=>{
    console.log('enter state 3')
  },
  onExit: ()=>{
    console.log('exit state 3')
  },
  onUpdate: ()=>{
    console.log('update state 3')
  },
})
.addState('four', {
  name: 'four',
  onEnter: ()=>{
    console.log('enter state 4')
  },
  onExit: ()=>{
    console.log('exit state 4')
  },
  onUpdate: ()=>{
    console.log('update state 4')
  },
})
.addState('five', {
  name: 'five',
  onEnter: ()=>{
    console.log('enter state 5')
  },
  onExit: ()=>{
    console.log('exit state 5')
  },
  onUpdate: ()=>{
    console.log('update state 5')
  },
})
.addState('six', {
  name: 'six',
  onEnter: ()=>{
    console.log('enter state 6')
  },
  onExit: ()=>{
    console.log('exit state 6')
  },
  onUpdate: ()=>{
    console.log('update state 6')
  },
})
.addState('seven', {
  name: 'seven',
  onEnter: ()=>{
    console.log('enter state 7')
  },
  onExit: ()=>{
    console.log('exit state 7')
  },
  onUpdate: ()=>{
    console.log('update state 7')
  },
})


// HOW-TO setup transitions
S
.addTransition('one', 'two')
.addTransition('one', 'six')
.addTransition('one', 'seven')
.addTransition('two', 'three')
.addTransition('two', 'seven')
.addTransition('three', 'four')
.addTransition('four', 'three')
.addTransition('four', 'six')
.addTransition('four', 'seven')
.addTransition('five', 'five')
.addTransition('six', 'seven')
.addTransition('seven', 'four')
.addTransition('seven', 'seven')


/* HOW-TO run the state-machine
    the state-machine update can be run at any-time
    you may implement more complex schemes with multiple state-machines that update each other
*/
setInterval(() => {
  S.update(25)
}, 250);


// HOW-TO set the intial state, can't transition 'from' the void...
S.setState('one')


// Test various transitions based on the diagram: `states.png`
testTransition('one', false)
testTransition('two', true)
testTransition('two', false)
testTransition('three', true)
testTransition('four', true)
testTransition('seven', true)
testTransition('seven', true)
testTransition('six', false)
testTransition('four', true)
testTransition('three', true)

S.setState('five')
testTransition('one', false)
testTransition('five', true)

S.setState('one')
testTransition('six', true)
testTransition('four', false)


process.exit(0)