import assertion from "../assert.js";
import StateMachine from '../../index.js'


export default function(tag) {
  const assert = assertion(tag)

  const O = {}
  const S = new StateMachine(O)


  S.verbose = true


  // HOW-TO setup states
  S
  .addState('one', {
    name: 'one',
    onEnter: ()=>{
      assert(S.state.name==='one', "entering state 'one' means state is 'one'", S.state)
    },
    onExit: ()=>{
    },
    onUpdate: ()=>{
    },
  })
  .addState('two', {
    name: 'two',
    onEnter: ()=>{
    },
    onExit: ()=>{
      assert(S.state.name==='two', "exiting state 'two' ~ state is still 'two'", S.state)
    },
    onUpdate: ()=>{
    },
  })
  .addState('three', {
    name: 'three',
    onEnter: ()=>{
    },
    onExit: ()=>{
    },
    onUpdate: ()=>{
    },
  })
  .addState('four', {
    name: 'four',
    onEnter: ()=>{
    },
    onExit: ()=>{
    },
    onUpdate: ()=>{
      assert(S.state.name==='four', "during update state should be 'four'", S.state)
    },
  })
  .addState('five', {
    name: 'five',
    onEnter: ()=>{
    },
    onExit: ()=>{
    },
    onUpdate: ()=>{
    },
  })
  .addState('six', {
    name: 'six',
    onEnter: ()=>{
    },
    onExit: ()=>{
    },
    onUpdate: ()=>{
    },
  })
  .addState('seven', {
    name: 'seven',
    onEnter: ()=>{
    },
    onExit: ()=>{
    },
    onUpdate: ()=>{
    },
  })


  // HOW-TO setup transitions
  // First, we test a single transition add
  S
  .addTransition('one', 'two')

  // Next, we test method chaining transition adding
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

  assert(S.transitions.filter(el=>(el.from==='one')&&(el.to==='two')).length, 'transition one->two exists', S.transitions)
  assert(S.transitions.filter(el=>(el.from==='two')&&(el.to==='seven')).length, 'transition two->seven exists', S.transitions)
  assert(!S.transitions.filter(el=>(el.from==='seven')).length, 'no transitions from _seven_', S.transitions)


  /*
      the state-machine update can be run at any-time
      you may implement more complex schemes with multiple state-machines that update each other
  */
  const testTimer = setInterval(() => {
    S.update(25)
  }, 250);


  // Have to force the intial state, there is no 'from' the void...
  S.setState('one')


  // Basic usage, cycle through states, test the queue
  S.setState('two')
  .setState('three')
  .setState('four')
  .setState('five')

  assert((S.state.name==='five'), "should be in state 'five'", S.state.name)
  
  S
  .setState('six')
  .setState('seven')
  .setState('one')

  assert((S.state.name==='one'), "should be in state 'one'", S.state.name)

  // Now we start over and test the transitioning
  S.setState('one')

  // Also testing that method chaining works
  S
  .goto('two')
  .goto('three')

  // Usually, expect to use goto() singlely
  S.goto('four')

  assert((S.state.name==='four'), "should be in state 'four'", S.state.name)
  
  
  S.goto('five')
  
  assert((S.state.name==='four'), "failed transition: should still be in state 'four'", S.state.name)

  S.goto('six')

  S.goto('seven')


  clearInterval(testTimer)


  S
  .goto('four')
  .goto('six')

  assert((S.state.name==='six'), "goto after stopping updates changes state: 'six'", S.queue)
  
  S.update()
  
  assert((S.state.name==='six'), "after a single update the state remains 'six'", S.state.name)
}