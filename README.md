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
The default state is 'void' which you probably don't want to include in your control schema.

If you call `goto` while the machine changing states then the transition will be queued.
In order to proceed with enqueued transitions you need to periodically call `update`.
This is not always relevant- perhaps only when you have long-running transition handlers and/or impatient users ;)


## TODO

* ?Should transitions also be `Map`?
