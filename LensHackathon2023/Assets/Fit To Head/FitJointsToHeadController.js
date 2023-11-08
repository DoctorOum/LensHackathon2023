// FitJointsToHeadController.js
// Version: 0.0.1
// Event: Lens Initialized
// Description: Pins and slides joints to Face Mesh


//@input Component.BaseMeshVisual mesh


// Dynamic offset of U coordinate
var uOffset = 0;
// Static value of V coordinate
var vValue = 0.79;
// Brim rotation speed
var brimOffset = 6.3;
// Touch indicators
var touching = false;
var touchVec = null;
// Joints list
var joints = [];
// This transform object is
var transform = script.getSceneObject().getTransform();
// Number of children
var childCount = script.getSceneObject().getChildrenCount();


function init() {
    var uStepSize = 1 / childCount;
    for (var i = 0; i < childCount; i++) {
        var childSO = script.getSceneObject().getChild(i);
        
        // Create a pin to mesh component
        var comp = childSO.createComponent("Component.PinToMeshComponent");
        comp.target = script.mesh;
        comp.preferredUVLayerIndex = 1;

        // Calculate and set UV values
        var uValue = uStepSize * i;
        comp.pinUV = new vec2(uValue, vValue);

        // Add the component to list
        joints.push(comp);
    }

    // Create events
    script.createEvent("TouchStartEvent").bind(onTouchStarted);
    script.createEvent("TouchMoveEvent").bind(onTouchMoved);
    script.createEvent("TouchEndEvent").bind(onTouchEnded);

    // Block default screen touching
    global.touchSystem.touchBlocking = true;
    global.touchSystem.enableTouchBlockingException("TouchTypeDoubleTap", true);
}


function onTouchStarted(data) {
    touching = true;
    touchVec = data.getTouchPosition();
}


function onTouchEnded(data) {
    touching = false;
}


function onTouchMoved(data) {
    if (!touching) {
        return;
    }

    var pos = data.getTouchPosition();
    var dir = pos.sub(touchVec);

    uOffset = dir.x;

    var uStepSize = 1 / joints.length;
    for (var i = 0; i < joints.length; i++) {
        // Calculate uValue
        var uValue = (uStepSize * i + uOffset) - Math.floor(uStepSize * i + uOffset);
        // Skip out of boundaries values
        if (uValue < 0.02 || uValue > 0.98) {
            continue;
        }
        // Set the UV values
        joints[i].pinUV = new vec2(uValue, vValue);
    }

    transform.setLocalRotation(quat.fromEulerAngles(0, uOffset * brimOffset, 0));
}


init();
