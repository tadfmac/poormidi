# poormidi.js

This is a very simple web midi api wrapper.

## usage

### initialization

```index.html
<script src="js/poormidi.js"></script>
```

```js
var midi = new poormidi();
```

### receive MIDI message

```js
midi.setHandler(onMIDIEvent);

function onMIDIEvent(e){
  var message = e.data[0] & 0xf0;
  if(message === 0x90){  // Note ON?
    // anything!
  }
}
```

### send Note On

```js
// Note No.= 40, Velocity = 100
midi.sendNoteOn(40,100);
```

or

```js
// MIDI ch.=1, Note No.= 40, Velocity = 100
midi.sendNoteOn(0, 40,100);
```


### send Note Off

```js
// Note No.= 40
midi.sendNoteOff(40);
```

### send Control Change

```js
// Control Number = 10, value = 100
midi.sendCtlChange(10,100);
```

That's all!
Enjoy! :D

# License

[Creative Commons Attribution 4.0](http://creativecommons.org/licenses/by/4.0/legalcode) 2015 by D.F.Mac.


