class StateMachine {
  static count = 0

  isChangingState = false
  queue = []  // list of state names
  states = new Map()
  state = {
    name: 'void',
    onEnter: ()=>{},
    onExit: ()=>{},
    onUpdate: ()=>{},
  }


  constructor(context) {
    /*
      the context allows us to bind this state-machine to a given object
      this allows the enter, exit, and update fx to act upon the context-object
    */
    this.context = context
    this.id = ++StateMachine.count
  }


  add(name, config) {
    if (!name) throw `State Machine <${this.id}>: addState must receive a 'name' parameter`

    this.states.set(name, {
      name: name,
      onEnter: config?.onEnter?.bind(this.context),
      onExit: config?.onExit?.bind(this.context),
      onUpdate: config?.onUpdate?.bind(this.context),
    })

    return this
  }


  currently(name) {
    return this.state?.name === name
  }


  set(name) {
    if (!this.states.has(name)) console.error(`State-Machine <${this.id}> doesn't have a state named ${name}`)

    if (this.state?.name === name) return

    if (this.isChangingState) return this.queue.push(name)

    // begin changing states
    this.isChangingState = true

    if (this.verbose) console.log(`State-Machine<${this.id}> changing from ${this.state.name} to ${name}`)

    // exit the previous state
    if (this.state?.onExit) this.state.onExit()

    // set the current state
    this.state = this.states.get(name)

    // enter the new state
    if (this.state?.onEnter) this.state.onEnter()

    this.isChangingState = false


    return this
  }


  update(dt) {
    if (this.queue.length) return this.set(this.queue.shift())

    if (this.state?.onUpdate) this.state.onUpdate()
  }
}


module.exports = StateMachine