import machine from './machine.js'


S1 = machine()
S2 = machine()


/* Run a continual update on both state machines
*/
setInterval(() => {
  S1.update(25) // this dT is fake, but you get the idea
  S2.update(25) // this dT is fake, but you get the idea
}, 250);


// Best practice to force the intial state, but a transition from 'void' is always valid
S1.setState('one')
S2.setState('one')


// Basic usage, cycle through states, test the queue
S1.goto('two')
S2.goto('two')
S1.goto('three')
S2.goto('three')
S1.goto('four')
S2.goto('four')
S1.goto('five')
S2.goto('five')
S1.goto('six')
S2.goto('six')
S1.goto('seven')
S2.goto('seven')
S1.goto('one')
S2.goto('one')
