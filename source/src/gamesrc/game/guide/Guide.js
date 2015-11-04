/**
 * Created by Leo on 2015/10/27.
 */
var Guide = lcocos.model.BaseStartScene.extend({
    ctor : function(){
        this._super()

        var _this = this
        var size = cc.winSize

        this.res_bg = res.gs_guide
        this.res_play = res.gs_guide_close
        this.call_play = function(){
            var scene = flax.currentScene
            _this.runAction(
                cc.sequence(
                    cc.moveBy(0.2,cc.p(0,600)),
                    cc.callFunc(function(){
                        _this.removeFromParent(true)
                        scene.start()
                    })
                )

            )
        }
        this.position_play = cc.p(size.width/2+180,size.height/2+190)

        this.render()
        return true
    }
})