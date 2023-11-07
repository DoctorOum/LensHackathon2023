// CountdownCompletionBehavior.js
// Version: 1.0.0
// Event: On Awake
// Description: Define your own behavior to run when the 3...2...1 countdown finishes

function onComplete() {
    //
    // ------ EDIT ME: Add your own behavior here
    //
    print("Countdown complete!");
}

script.api.onComplete = onComplete;