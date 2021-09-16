export default class FiniteStateMachine {
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
  transitions = [{}]


  /**
   * 
   * @param {Object} context - parent Object, callback functions are bound to this Object
   * @param {String} name - optional name for the machine, if omitted a generated id number is used
   */
  constructor(context, name) {
    /*
      the context allows us to bind this state-machine to a given object
      this allows the enter, exit, and update fx to act upon the context-object
    */
    this.context = context
    this.id = ++FiniteStateMachine.count
    this.name = name || this.id
  }


  /**
   * 
   * @param {String} name - state name
   * @param {Object} config - Object containing optional parameters: onEnter, onExit, and onUpdate (latter 3 are callback, lifecycle functions)
   * @returns this
   */
  addState(name, config) {
    if (!name) throw `State-Machine<${this.name}> addState must receive a 'name' parameter`

    this.states.set(name, {
      name: name,
      onEnter: config?.onEnter?.bind(this.context),
      onExit: config?.onExit?.bind(this.context),
      onUpdate: config?.onUpdate?.bind(this.context),
    })

    return this
  }


  /**
   * 
   * @param {String} fromState - state name
   * @param {String} toState - state name
   * @returns this
   */
  addTransition(fromState, toState) {
    this.transitions.push({
      from: fromState,
      to: toState
    })

    return this
  }


  /**
   * 
   * @param {String} desiredState - state name
   * @returns this
   */
  goto(desiredState) {
    // transition is only valid if we have a transition registered from the current state to the desired state
    const valid = this.hasTransition(this.state.name, desiredState)

    if (this.verbose) console.log(`State-Machine<${this.name}> transition from ${this.state.name} to ${desiredState}? ${valid? 'valid': 'invalid'}`)

    if (valid) {
      this.setState(desiredState)
    } else {
      console.error(`State-Machine<${this.name}> does not have a transition registered from ${this.state.name} to ${desiredState}`)
    }

    return this
  }


  /**
   * 
   * @param {String} from - state name
   * @param {String} to - state name
   * @returns {Boolean} indicating whether such a transition exists
   */
  hasTransition(from, to) {
    return this.transitions.filter(el=>((from===el.from) && (to===el.to))).length
  }


  /**
   * 
   * @param {String} name - state name
   * @returns {String} which is the name of the current state
   */
  inState(name) {
    return this.state?.name === name
  }


  /**
   * 
   * @param {String} name - state name
   * @returns this
   */
  setState(name) {
    if (!this.states.has(name)) throw `State-Machine <${this.name}> doesn't have a state named ${name}`

    if (this.state?.name === name) return

    if (this.isChangingState) {
      if (this.verbose) console.log(`State-Machine<${this.name}> enqueueing ${name}`)
      return this.queue.push(name)
    }

    // begin changing states
    this.isChangingState = true

    if (this.verbose) console.log(`State-Machine<${this.name}>.setState() from ${this.state.name} to ${name}`)

    // exit the previous state
    if (this.state?.onExit) this.state.onExit()

    // set the current state
    this.state = this.states.get(name)

    // enter the new state
    if (this.state?.onEnter) this.state.onEnter()

    this.isChangingState = false

    return this
  }


  /**
   * 
   * @param {Number} dt - ostensibly the elapsed time since the last update, this number is simply passed through to the current state's onUpdate callback function
   */
  update(dt) {
    if (this.queue.length) return this.setState(this.queue.shift())

    if (this.state?.onUpdate) this.state.onUpdate(dt)
  }
}