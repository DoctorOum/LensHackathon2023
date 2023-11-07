// @input string question = "What are some ideas for Lenses?"
// @input Component.Text3D textDisplay

const request = { 
    "temperature": 1,
    "messages": [
        {"role": "user", "content": script.question}
    ]
};

function requestGPT() {
    print(`Requesting answer for: ${script.question}`);
    
    global.chatGpt.completions(request, (errorStatus, response) => {
        if (!errorStatus && typeof response === 'object') {
            const mainAnswer = response.choices[0].message.content;
            print(mainAnswer);
            script.textDisplay.text = mainAnswer;
        } else {
            print(JSON.stringify(response));
        }
    })
}

function readGPT()
{
    if(script.textDisplay.text!==""){
    global.getTTSResults(script.textDisplay.text); 
}else{
    print("ERROR: Please input TTS Text");
}
}

script.createEvent("OnStartEvent").bind(requestGPT);
//script.createEvent("TapEvent").bind(requestGPT);
script.createEvent("TapEvent").bind(readGPT);
print("Tap to call GPT!");