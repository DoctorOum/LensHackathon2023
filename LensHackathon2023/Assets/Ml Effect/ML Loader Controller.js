// -----JS CODE-----
// @input Component.ScriptComponent[] mlEffects { "label": "ML Effects" }
// @input SceneObject loadingSpinner

var loadingWaiter = script.createEvent("UpdateEvent");

loadingWaiter.bind(function() {
    if (checkLoadingStatus()) {
        script.loadingSpinner.enabled = false;
        loadingWaiter.enabled = false;
    }
});

function checkLoadingStatus() {
    var loadingStatus = true;
    
    script.mlEffects.forEach(function(mlEffect) {
        if (mlEffect.state == MachineLearning.ModelState.NotReady) {
            loadingStatus = false;
        }
    });
    
    return loadingStatus;
}