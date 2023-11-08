// -----JS CODE-----

// @input Component.ScriptComponent[] mlEffects { "label": "ML Effects" }
// @input float intensity { "widget": "slider", "min": 0.0, "max": 1.0, "step": 0.001}

script.mlEffects.forEach(function(mlEffect) {
    mlEffect.addOnLoadingFinishedCallback(function() {
        mlEffect.intensity = script.intensity;
    });
});    