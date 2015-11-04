/**
 * Created by Leo on 2015/10/24.
 */
var StartScene = cc.Scene.extend({

    onEnter : function(){
        this._super()

        if(!lc.isDebug){
            ggax()
        }
        var size = cc.winSize

        if(!flax.inputManager){
            flax.inputManager = new flax.InputManager()
        }


        var scene = flax.assetsManager.createDisplay(res.ss,'scene')
        this.addChild(scene)
        scene.setPosition(cc.p(0,size.height))

        flax.inputManager.addListener(scene.bPlay,function(){
            flax.replaceScene("gs");
        },InputType.click,this)

    }
})