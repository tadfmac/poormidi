// poormidi.js (Very Poor) Web MIDI API Wrapper
// For Google Chrome Only :D

// 2015.02.23 Change for P&P on Chrome Canary !!!! (W.I.P. and experimental now)
// 2015.06.07 P&P feature has now supported.
// 2015.08.08 add sendCtlChange()

var poormidi = function(){
  this.midi = null;
  this.inputs = [];
  this.outputs = [];
  this.timer = null;

  this.success = function(access){
    console.log("poormidi.success()");
    this.midi = access;
    this.refreshPorts();
    this.midi.onstatechange = this.onStateChange;
  }.bind(this);

  this.failure = function(msg){
    console.log("poormidi.failure(): "+msg);
  }.bind(this);

  this.onMidiEvent = function(e){
    console.log("poormidi.onMidiEvent()");
  }.bind(this);

  this.setHandler = function(func){
    console.log("poormidi.setHandler()");
    this.onMidiEvent = func.bind(this);
  }.bind(this);

  this.sendNoteOn = function(note,velocity){
    console.log("poormidi.sendNoteOn()");
    if(this.outputs.length > 0){
      for(var cnt=0;cnt<this.outputs.length;cnt++){
        console.log("poormidi.sendNoteOn() output to :"+this.outputs[cnt].name);
        this.outputs[cnt].send([0x90,note&0x7f,velocity&0x7f]);
      }
    }
  }.bind(this);

  this.sendNoteOff = function(note){
    console.log("poormidi.sendNoteOff()");
    if(this.outputs.length > 0){
      for(var cnt=0;cnt<this.outputs.length;cnt++){
        console.log("poormidi.sendNoteOff() output to :"+this.outputs[cnt].name);
        this.outputs[cnt].send([0x80,note,0]);
      }
    }
  }.bind(this);

  this.sendCtlChange = function(number,value){
    console.log("poormidi.sendCtlChange()");
    if(this.outputs.length > 0){
      for(var cnt=0;cnt<this.outputs.length;cnt++){
        console.log("poormidi.sendCtlChange() output to :"+this.outputs[cnt].name);
        this.outputs[cnt].send([0xB0,number&0x7f,value&0x7f]);
      }
    }
  }.bind(this);

  this.onStateChange = function(){
    console.log("poormidi.onStateChange()");
    if(this.timer != null){
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(function(){
      this.refreshPorts();
      this.timer = null;
    }.bind(this),300);
  }.bind(this);

  this.refreshPorts = function(){
    console.log("poormidi.refreshPorts()");
    this.inputs = [];
    this.outputs = [];

    // inputs
    var it = this.midi.inputs.values();
    for(var o = it.next(); !o.done; o = it.next()){
      this.inputs.push(o.value);
      console.log("input port: "+o.value.name);
    }
    console.log("poormidi.refreshPorts() inputs: "+this.inputs.length);

    for(var cnt=0;cnt<this.inputs.length;cnt++){
      this.inputs[cnt].onmidimessage = this.onMidiEvent;
    }

    // outputs
    var ot = this.midi.outputs.values();
    for(var o = ot.next(); !o.done; o = ot.next()){
      this.outputs.push(o.value);
      console.log("output port: "+o.value.name);
    }
    console.log("poormidi.refreshPorts() outputs: "+this.outputs.length);

  }.bind(this);

  this.onConnect = function(e){
    console.log("poormidi.onConnect()");
  }
  this.onDisConnect = function(e){
    console.log("poormidi.onDisConnect()");
  }

  navigator.requestMIDIAccess().then(this.success,this.failure);
};
