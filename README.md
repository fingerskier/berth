# state-machine


## Usage

* Instantiation
```js
  const StateMachine = require('stateinator')

  const context = {}

  const S = new StateMachine({})
```

* Setup States

```
  S.addState('ONE', {
    onEnter: ()=>{
      thing.activate()
    },
    onUpdate: ()=>{
      thing.update()
    },
    onExit: ()=>{
      thing.deactivate()
    },
  })
```

* Setup Transitions

```
  S.addTransition('ONE', 'TWO')
  S.addTransition('ONE', 'THREE')
  S.addTransition('TWO', 'ONE')
  S.addTransition('THREE', 'TWO')
```

* Updating

```
  S.update()
```

`update` will perform any pending transition changes (1 per cycle) and call `onUpdate` for the current state.

* Goto States

```
  S.setState('blah')
  
  onButtonClick = ()=> S.goto('flarn')
```

**It is important** to call `setState` initially.
The default state is 'void' which is probably not useful.
A transition _from_ 'void' is always valid.
Note, also, that a transition from a state to itself must be defined.

If you call `goto` while the machine is changing states then the transition will be queued.
In order to proceed with enqueued transitions you need to periodically call `update`.


## TODO

* ?Should transitions also be `Map`?
