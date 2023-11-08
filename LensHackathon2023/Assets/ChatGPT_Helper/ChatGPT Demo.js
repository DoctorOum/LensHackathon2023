// @input string question = "What are some ideas for Lenses?"
// @input Component.Text3D textDisplay
// @input Component.Text3D endTimeText

var timer = 0;
var speak = false;

const request = {
  "temperature": 1,
  "messages": [
    { "role": "user", "content": script.question }
  ]
};

function requestGPT() {
  print(`Requesting answer for: ${script.question}`);

  global.chatGpt.completions(request, (errorStatus, response) => {
    if (!errorStatus && typeof response === 'object') {
      const mainAnswer = response.choices[0].message.content;
      print(mainAnswer);
      script.textDisplay.text = mainAnswer;
      readGPT(mainAnswer.split(/[,.!]/));
    } else {
      print(JSON.stringify(response));
    }
  })
}

function _readGPT(textsToRead, i) {
  //script.endTimeText.text = "_readGPT textsToRead.length " +  textsToRead.length + " i: " + i

  // print("_readGPT | length " + textsToRead.length + "| i: " + i)
  if (i > textsToRead.length - 1) {
    return
  }

  global.onTTSSuccessCallback = () => {
    //script.endTimeText.text = script.endTimeText.text + "\n\n_readGPT onTTSSuccessCallback | i: " + i

    print("_readGPT onTTSSuccessCallback | i: " + i)

    var delayedEvent = script.createEvent("DelayedCallbackEvent");
    delayedEvent.bind(function (eventData) {
      _readGPT(textsToRead, i + 1)
    });
    delayedEvent.reset(global.endTime / 1000);
  }
  global.getTTSResults(textsToRead[i]);
}

function readGPT(textsToRead) {

  //    readSingleText("hello world", 2, () => {
  //     readSingleText("goodbye world", 2, () => {

  //     })
  //    })

  print("readGPT start");
  _readGPT(textsToRead, 0)


  // if(script.textDisplay.text!==""){
  //     //Timer keep calling next sentence in split prompt after end time

  //     //script.endTimeText.text = global.endTime;



  // } else {
  //     print("ERROR: Please input TTS Text");
  // }
}

function countdownPerSentence() {
  timer += getDeltaTime();

  if (timer >= global.endTime) {
    speak = true;
  }
  else {
    speak = false;
    timer = 0;
  }
}

script.createEvent("OnStartEvent").bind(requestGPT);
//script.createEvent("UpdateEvent").bind(countdownPerSentence);
//script.createEvent("TapEvent").bind(requestGPT);
//script.createEvent("").bind(readGPT);
print("Tap to call GPT!");