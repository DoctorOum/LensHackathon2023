// @input string question = "What are some ideas for Lenses?"
// @input Component.Text3D textDisplay
// @input string[] splitPrompt

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
            splitPromptToSentences(mainAnswer)
            //readGPT();
        } else {
            print(JSON.stringify(response));
        }
    })
}

function readGPT(text) {
    if(script.textDisplay.text!==""){
        global.getTTSResults(script.textDisplay.text); 
    } else {
        print("ERROR: Please input TTS Text");
    }
}

function splitPromptToSentences(text) {
    script.splitPrompt = text.match( /[^\.!\?]+[\.!\?]+/g );
    
    for (let i = 0; i < script.splitPrompt.length; i++) {
        readGPT(script.splitPrompt[i].text);
    }
}

script.createEvent("OnStartEvent").bind(requestGPT);
//script.createEvent("TapEvent").bind(requestGPT);
//script.createEvent("").bind(readGPT);
print("Tap to call GPT!");