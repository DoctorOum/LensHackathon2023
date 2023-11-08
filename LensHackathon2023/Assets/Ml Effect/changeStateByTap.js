// -----JS CODE-----
// @input Component.ScriptComponent[] mlEffects { "label": "ML Effects" }

script.createEvent("TapEvent").bind(function() {
    script.mlEffects.forEach(function(mlEffect) {
        if (mlEffect.state == MachineLearning.ModelState.Running) {
            mlEffect.stop();
        } else if (mlEffect.state == MachineLearning.ModelState.Idle) {
            mlEffect.run();
        } else if (mlEffect.state == MachineLearning.ModelState.Loading) {
            print("ML Effect is loading at the moment.");
        } else if (mlEffect.state == MachineLearning.ModelState.NotReady) {
            print("ML Effect should be build first.");
        }
    });
});