/**
 * Created by Leo on 2015/10/27.
 */

var Player = cc.Class.extend({

    isRunning : false,
    __player : null,
    ctor : function(p){
        //this._super()

        this.__player = p
        this.__player.up.visible = false
        this.__player.die.visible = false
        this.__player.step.gotoAndStop(2)
        this.__player.step.fps = 10
        this.__player.up.fps = 6
        this.__player.die.autoStopWhenOver = true

        var player = this.__player
        var _die = player.die
        _die.onAnimationOver.add(function(){
            player.stopAllActions()
            flax.currentScene.showGameOver()
        })
        //this.__player.die =


        this.__collistion = this.__player.collision
        this.__collistion.visible = false
        //this.__collistion.drawRect(cc.p(-15,-50),cc.p(15,50))
        //this.__player.addChild(this.__collistion)
        //this.__collistion.x = 35
        //this.__collistion.y = 50
        //this.__collistion.width = 30
        //this.__collistion.height = 100

        return true
    },




    // move action
    move : function ( dir ){
        var _this = this
        this.isRunning = true

        var _x
        if(dir == 'left'){
           _x = -400
        }else{
           _x = 400
        }
        this.__player.step.play()
        this.__player.runAction(
            cc.sequence(
                cc.moveBy(4,cc.p(_x,0)),
                cc.callFunc(function(){
                    _this.__up()
                })
            )

        )
    },


    __up : function(){
        if(this.__player.x < 40){
            if(this.__player.y > 1215){
                g.level++
                flax.replaceScene('gs')
                return
            }
        }

        g.local_score++
        var _this = this
        this.__player.step.gotoAndStop(2)
        this.__player.step.visible = false
        this.__player.up.visible = true
        this.__player.up.play()
        this.__player.runAction(
            cc.sequence(
                cc.moveBy(1,cc.p(0,120)),
                cc.callFunc(function(){
                    _this.__player.up.stop()
                    _this.__player.up.visible = false
                    _this.__player.step.visible = true
                    _this.__player.scaleX = -_this.__player.scaleX
                    _this.isRunning = false
                })
            )
        )
       //
       //
    },






















    showDie : function ( ) {
        this.__player.step.visible = false
        this.__player.die.visible = true
        this.__player.die.play()
    },


    getCollision : function(){
        return this.__collistion
    },
    getPosition : function(){
        return this.__player.getPosition()
    },
    getWorldPosition : function(){
        return lc.point.getWorldPoint(this.__player)
    }
})