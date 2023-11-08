//@input SceneObject playerOneTrackingPoint
//@input SceneObject playerTwoTrackingPoint
//@input SceneObject playerOneMarker
//@input SceneObject playerTwoMarker
//@input Component.Camera perspectiveCamera
//@input Component.Text playerOneText
//@input Component.Text playerTwoText
//@input SceneObject playerOneWinnerSign
/** @type {SceneObject} */
var playerOneWinnerSign = script.playerOneWinnerSign;
//@input SceneObject playerTwoWinnerSign
/** @type {SceneObject} */
var playerTwoWinnerSign = script.playerTwoWinnerSign;


var isReady = false
var playing = false
var winner = null

var playerOneTransform
var playerTwoTransform
var yFactor = new vec3(0, 3.05, 0)

// TODO Add countdown timer

script.createEvent("OnStartEvent").bind(function () {
  playerOneTransform = script.playerOneTrackingPoint.getTransform()
  playerTwoTransform = script.playerTwoTrackingPoint.getTransform()
})

script.createEvent("UpdateEvent").bind(function () {
  if (playing) {
    var playerOnePos = playerOneTransform.getWorldPosition()
    var playerTwoPos = playerTwoTransform.getWorldPosition()

    var playerOneMarkerPos = script.playerOneMarker.getTransform().getWorldPosition()
    var playerTwoMarkerPos = script.playerTwoMarker.getTransform().getWorldPosition()

    // compare the Y values of playerOnePos and PlayeroneMarkerPos
    // if playerOnePos is lower than playerOneMarkerPos, then playerOne is squatting
    // if playerone is higher than playerOneMarkerPos, then playerOne loses the game
    const playerOneY = playerOnePos.y
    const playerOneMarkerY = playerOneMarkerPos.y
    const playerTwoY = playerTwoPos.y
    const playerTwoMarkerY = playerTwoMarkerPos.y

    if (playerOneY > playerOneMarkerY) {
      print('p1 loses')
      // print(playerOneY)
      // print(playerOneMarkerY)
      // playerOne loses
      playing = false
      winner = "Player Two"
      // script.playerTwoText.text = "Player Two Wins!"
      //script.playerOneText.text = "LOSER!"
      playerTwoWinnerSign.enabled = true
      // do winning thing!!!
    }

    if (playerTwoY > playerTwoMarkerY) {
      print("p2 loses")
      // playerOne loses
      playing = false
      winner = "Player One"
      // script.playerTwoText.text = "Loser!"
      // script.playerOneText.text = "Player One Wins!"
      playerOneWinnerSign.enabled = true
      // do winning thing!!!
    }
  }

})


function setUp() {
  // pin bar to start pos    

  //script.screenTransform.anchors.setCenter(new vec2(-0.25, 0.5)
  script.playerOneMarker.enabled = true
  script.playerTwoMarker.enabled = true
  script.playerOneMarker.getTransform().setWorldPosition(playerOneTransform.getWorldPosition().add(yFactor))
  script.playerTwoMarker.getTransform().setWorldPosition(playerTwoTransform.getWorldPosition().add(yFactor))
  playing = true
}

function onCountdownComplete() {
  setUp()
}

script.api.onCountdownComplete = onCountdownComplete;

