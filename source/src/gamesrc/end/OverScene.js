/**
 * Created by Leo on 2015/10/26.
 */



var WinScene = lcocos.model.BaseOverScene.extend({

    _local_score : null,
    _best_score : null,
    ctor : function(){
        this._super()

        var _this = this
        var size = cc.winSize

        this.res_bg = res.os_win_bg
        this.res_home = res.os_win_home_png
        this.res_reGo = res.os_win_restart_png
        this.home_position = cc.p(size.width/2,200)
        this.reGo_position = cc.p(size.width/2,300)
        this.reGo_call = function(){
            //var scene = flax.currentScene
            //var game_over = scene.gameOver
            _this.runAction(
                cc.sequence(
                    cc.moveBy(0.2,cc.p(0,600)),
                    cc.callFunc(function(){
                        //game_over.removeFromParent(true)
                        //scene.game.
                        _this.removeFromParent(true)
                        flax.replaceScene("gs");
                    })
                )

            )
        }
        this.render()


        // 本局得分
        //this._local_score = new cc.LabelTTF("12345678","Arial",38)
        //this.addChild(this._local_score)
        //this._local_score.setPosition(cc.p(316,460))
        // 最高得分
        //this._best_score = new cc.LabelTTF("12345678","Arial",38)
        //this.addChild(this._best_score)
        //this._best_score.setPosition(cc.p(316,346))
        return true
    },
    setLocalScore : function(value){
        this._local_score.setString(value)
    },
    setBestScore : function(value){
        this._best_score.setString(value)
    }
})





var LoseScene = lcocos.model.BaseOverScene.extend({

    _local_score : null,
    _best_score : null,
    ctor : function(){
        this._super()

        var _this = this
        var size = cc.winSize

        this.res_bg = res.os_lose_bg
        this.res_home = res.os_lose_home_png
        this.res_reGo = res.os_lose_restart_png
        this.home_position = cc.p(size.width/2,200)
        this.reGo_position = cc.p(size.width/2,300)
        this.reGo_call = function(){
            //var scene = flax.currentScene
            //var game_over = scene.gameOver
            _this.runAction(
                cc.sequence(
                    cc.moveBy(0.2,cc.p(0,600)),
                    cc.callFunc(function(){
                        //game_over.removeFromParent(true)
                        //scene.game.
                        _this.removeFromParent(true)
                        flax.replaceScene("gs");
                    })
                )

            )
        }
        this.render()


        // 本局得分
        //this._local_score = new cc.LabelTTF("12345678","Arial",38)
        //this.addChild(this._local_score)
        //this._local_score.setPosition(cc.p(316,460))
        // 最高得分
        //this._best_score = new cc.LabelTTF("12345678","Arial",38)
        //this.addChild(this._best_score)
        //this._best_score.setPosition(cc.p(316,346))
        return true
    },
    setLocalScore : function(value){
        this._local_score.setString(value)
    },
    setBestScore : function(value){
        this._best_score.setString(value)
    }
})