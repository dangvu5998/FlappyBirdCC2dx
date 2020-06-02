

cc.game.onStart = function () {
    if (!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));
    // Pass true to enable retina display, disabled by default to improve performance
    cc.view.enableRetina(true);
    // Adjust viewport meta
    cc.view.adjustViewPort(true);
    jsb.fileUtils.addSearchPath(fr.NativeService.getFolderUpdateAssets(), true);
    jsb.fileUtils.addSearchPath(fr.NativeService.getFolderUpdateAssets() + "/res", true);
    cc.loader.resPath = "res";
    cc.LoaderScene.preload(g_resources, function () {
        //hide fps
        cc.director.setDisplayStats(true);
        // Setup the resolution policy and design resolution size
        var frameSize = cc.view.getFrameSize();
        cc.view.resizeWithBrowserSize(true);
        cc.director.runScene(new GameMenuScene());
    }, this);
};
cc.game.run();