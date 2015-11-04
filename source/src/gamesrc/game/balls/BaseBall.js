/**
 * Created by Leo on 2015/11/2.
 */

var BaseBall = cc.Node.extend({

    // setting
    resPath : '',
    mcName : '',

    // child
    collision : null,
    point : null,
    // private
    __speed : 20,
    __rotate : 10,
    __dir : 0,

    event : null,
    render : function(){
        var mc = flax.assetsManager.createDisplay(this.resPath,this.mcName)
        this.addChild(mc)

        this.collision = mc.collision
        this.point = mc.point

        this.__speed = Math.random() * 18 + 5
        this.scheduleUpdate()

        var _d = this.__speed/60
        this.scheduleOnce(function(){
            var event = new cc.EventCustom('other_catch')
            cc.eventManager.dispatchEvent(event)
        },_d)
    },

    __delay : 200,
    update : function(dt){
        this.rotation += (this.__speed)

        if(this.__dir==2){
            this.__delay-=dt*1000
            if(this.__delay < 0){
                this.__dir = 1
            }
        }
        if(this.__dir==0){
            // right
            this.x += this.__speed
            if(this.x > 380){
                this.__dir=1


            }
        }
        if(this.__dir==1){
            if(this.__speed < 0){
                return
            }
            //left
            this.x -= this.__speed
            this.__speed -= 1
        }



    }
})