/*
  Testing two interactive state-machines
*/

const StateMachine = require('.')

const O1 = {}
const S1 = new StateMachine(O1, 'One')

const O2 = {}
const S2 = new StateMachine(O2, 'Two')


S1.verbose = true
S2.verbose = true

// Each state-machine is a cycle: 1 -> 2 -> 3

// The update functions for each state will trigger a transition in the other state-machine

S1
.addState(1, {
  onUpdate: ()=>{
    console.log('S1:1 Update')
    S2.setState(1)
  },
})
.addState(2, {
  onUpdate: ()=>{
    console.log('S1:2 Update')
    S2.goto(2)
  },
})
.addState(3, {
  onUpdate: ()=>{
    console.log('S1:3 Update')
    S2.goto(3)
  },
})


S2
.addState(1, {
  onUpdate: ()=>{
    console.log('S2:1 Update')
    S1.goto(2)
  },
})
.addState(2, {
  onUpdate: ()=>{
    console.log('S2:2 Update')
    S1.goto(3)
  },
})
.addState(3, {
  onUpdate: ()=>{
    console.log('S2:3 Update')
    S1.goto(1)
  },
})


S1
.addTransition(1, 2)
.addTransition(2, 3)
.addTransition(3, 1)


S2
.addTransition(1, 2)
.addTransition(2, 3)
.addTransition(3, 1)


S1.setState(1).update()
S1.update()
S2.update()
S1.update()
S2.update()
S1.update()
S2.update()
S1.update()
S2.update()
S1.update()
S2.update()
S1.update()
S2.update()
S1.update()
S2.update()