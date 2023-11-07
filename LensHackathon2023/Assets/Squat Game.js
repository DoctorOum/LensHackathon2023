//@input SceneObject playerOneTrackingPoint
//@input SceneObject playerTwoTrackingPoint
//@input Component.Camera perspectiveCamera
//@input Component.ScreenTransform playerOneMarker
//@input Component.ScreenTransform playerTwoMarker

var isReady = false
var playing = false
var winner = null

var playerOneTransform
var playerTwoTransform

var playerOneMarkerTransform
var playerTwoMarkerTransform 

// TODO Add countdown timer

script.createEvent("OnStartEvent").bind(function() {
    playerOneTransform = script.playerOneTrackingPoint.getTransform()
    playerTwoTransform = script.playerTwoTrackingPoint.getTransform()
    
    
    //script.screenTransform.anchors.setCenter(new vec2(-0.25, 0.5)
})

script.createEvent("UpdateEvent").bind(function() {
    // bind screen image to head tracking
})

var delayEvent = script.createEvent("DelayedCallbackEvent")

delayEvent.bind(function() {
    print('bruuuh')
    playing = true
    setUp()
  
})

function setUp() {
    // pin bar to start pos
    
    var playerOneScreenTransform = script.perspectiveCamera.worldSpaceToScreenSpace(playerOneTransform.getWorldPosition())
    var playerTwoScreenTransform = script.perspectiveCamera.worldSpaceToScreenSpace(playerTwoTransform.getWorldPosition())
          
}

delayEvent.reset(2)

function onCountdownComplete() {
    //
    // ------ EDIT ME: Add your own behavior here
    //

    playing = true
    
    // Pin bar to head start
    
    // show a message that says "Go" xw
    
    print("Countdown complete!");
}

script.api.onCountdownComplete = onCountdownComplete;

