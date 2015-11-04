/**
 * Created by Leo on 2015/10/27.
 */


var Barricade = cc.Class.extend({


    collisions : [],

    pumpkins : [],

    __layer : null,
    __pumpkin_position : null,
    ctor : function(l){

        this.__layer = l
        this.dispose()

        var e1  = this.__layer.e1c
        var e2  = this.__layer.e2c
        var e3  = this.__layer.e3c
        e1.speed = this.__getTime()
        e2.speed = this.__getTime()
        e3.speed = this.__getTime()
        this.collisions.push(e1,e2,e3)

        this.__pumpkin_position = []
        this.__pumpkin_position.push(e1.getPosition().x,e2.getPosition().x,e3.getPosition().x)

        e1.e1.play()
        e2.e2.play()
        e3.e3.play()

        e1.collision.visible = false
        e2.collision.visible = false
        e3.collision.visible = false


        return true
    },




    ___time : 0,
    run : function(dt){
        this.___time+=dt
        if(this.___time>=10){
            this.___time -= 10
            this.__cPumpkin()
        }

        var item
        var point
        for(var i = 0; i < this.collisions.length; i++){
            item = this.collisions[i]
            point = lc.point.getWorldPoint(item)
            if(point.y > 750){
                if(item.speed < 0){
                    item.scaleY = 1
                    item.speed = -item.speed
                }
            }
            if(point.y < 50){
                if(item.speed > 0){
                    item.scaleY = -1
                    item.speed = -item.speed
                }
            }
            item.y -= item.speed
        }
    },

    __getTime : function(){
        var t = Math.random()  + g.level
        return t
    },

    __cPumpkin : function(){
        var ps =this.pumpkins
       var c = new cc.Sprite(res.gs_pumpkin)
        this.__layer.addChild(c,10)
        ps.push(c)
        var index = Math.floor(Math.random()*3)
        c.setPosition(cc.p(this.__pumpkin_position[index],2000))
        c.runAction(
            cc.sequence(
                cc.moveBy(8,cc.p(0,-2000)),
                cc.callFunc(function(){
                    c.removeFromParent(true)
                    ps.shift()
                })
            )

        )
    },

    __bom : null,
    showBom : function(pos){
        if(!this.__bom){
            this.__bom = new lcocos.model.BaseAnimation()
            this.__bom.res_plist = res.gs_bom
            this.__bom.frames = 5
            this.__bom.start_index = 2
            var _this = this
            this.__bom.onFishedCall = function(){
                _this.__bom.stop()
                _this.__bom.removeFromParent(true)
            }
            this.__bom.render()
        }
        if(!this.__bom.parent){
            this.__layer.addChild(this.__bom)
        }
        this.__bom.setPosition(pos)
        this.__bom.play()
    },





    dispose : function(){
        var arr = this.collisions
        while(arr.length){
            var item = arr.shift()
            item.stopAllActions()
        }
        arr = this.pumpkins
        while(arr.length){
            var item = arr.shift()
            item.stopAllActions()
        }
    }

})