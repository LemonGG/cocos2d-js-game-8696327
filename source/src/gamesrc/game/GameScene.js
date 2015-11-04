/**
 * Created by Leo on 2015/10/24.
 */
var GameScene = cc.Scene.extend({

    _my : null,
    _other : null,
    _ball_arr : [],

    __my_init_point : null,
    __other_init_point : null,

    __my_action : null,
    __other_action : null,
    ctor : function(){
        this._super()


        var size = cc.winSize
        var _this = this
        //this._ball_arr = []





        this.scene = flax.assetsManager.createDisplay(res.gs_scene,'scene')
        this.addChild(this.scene)
        this.scene.setPosition(cc.p(0,size.height))

        this._my = this.scene.my
        this._other = this.scene.other
        this._my.collision.visible = false
        this._my.point.visible = false
        this._other.collision.visible = false
        this._other.point.visible = false

        this.showGuide()



        this.win = new WinScene()
        this.lose = new LoseScene()

        return true
    },


    update : function(dt){
        this.__check_my_ball(this._other,this.__other_action)
        this.__check_my_ball(this._my,this.__my_action)
    },


    __check_my_ball : function(who,action){
        if(!this.__isInit()){
            return
        }
        if(!action){
            return
        }
        var _this = this
        var my = who//this._my

        var __ball_arr  = this._ball_arr
        var ball = __ball_arr[0]
        if(ball.isMoving)return
        if(lc.collision.d2d(my.collision,ball.collision)){

            ball.stopAllActions()
            ball.isMoving = true
            var mcname = ball.mcName
            var whoname = my.assetID
            if(mcname=='ball_4'||mcname=='ball_5'){
                if(whoname=='other'){
                    g.my_score++
                    this.____sl('My Score:'+ g.my_score)
                    cc.audioEngine.playEffect( res.gs_cat_) ;
                }else{
                    g.other_score++
                    this.____sl('Enemy Score:'+ g.other_score)
                }
            }else{
                if(whoname=='other'){
                    g.other_score++
                    this.____sl('Enemy Score:'+ g.other_score)
                }else{
                    g.my_score++
                    this.____sl('My Score:'+ g.my_score)
                    cc.audioEngine.playEffect( res.gs_cat_) ;
                }
            }

            //var action = this.__my_action.clone()
            ball.runAction(
                cc.sequence(
                    action.reverse(),
                    cc.callFunc(function(){
                        ball.removeFromParent(true)
                        __ball_arr.splice(0,1)

                        if(g.other_score== g.winScore){
                            _this.showLose()
                        }
                        if(g.my_score == g.winScore){
                            _this.showWin()
                        }
                    })
                )
            )
            //ball.setPosition(my.getPosition())
        }

    },

    __isInit : function(){
        if(!this._my || !this._ball_arr || !this._ball_arr.length){
            return false
        }
        return true
    },

    __checkCollision : function(){
        var arr = this.barricade.collisions
        var player = this.player.getCollision()
        var item
        for(var i = 0; i < arr.length; i++){
            item = arr[i]
            if(lc.collision.d2d(player,item.collision)){
                i = 100
                this.barricade.dispose()
                this.player.showDie()
               // this.showGameOver()
            }
        }
        arr = this.barricade.pumpkins
        for(var i = arr.length-1; i >= 0; i--){
            item = arr[i]
            if(lc.collision.d2d(player,item)){
                arr.splice(i,1)
                g.local_score+=10
                var point = item.getPosition()
                this.barricade.showBom(point)
                item.removeFromParent(true)
            }
        }


    },

   __moveScene : function(){
       var point = this.player.getWorldPosition()
       if(point.y > 400){
           if(this.bgLayer.y>-398){
               var _y = point.y-400
               this.bgLayer.y -= _y
               //this.bgLayer.enemyLayer.y += _y
           }
       }
   },

    start : function(){
        g.my_score = 0
        g.other_score = 0
        var balls_class = [
            Ball_0,Ball_1,Ball_2,Ball_3,Ball_4,Ball_5
        ]
        var _this = this
        var scene = this.scene
        var balls = this._ball_arr
        var other  = this._other
        var my = this._my
        my.setLocalZOrder(10)
        other.setLocalZOrder(10)

        flax.inputManager.addListener(my,function(){
            if(!balls.length)return
            var ball = balls[0]
            var my_point = lc.point.getWorldPoint(my.point)
            var ball_point = lc.point.getWorldPoint(ball.point)
            var space_x = ball_point.x - my_point.x
            var space_y = ball_point.y - my_point.y
            var space_point = cc.p(space_x,space_y)
            var action = cc.moveBy(0.2,space_point)
            this.__my_action = action
            my.runAction(
                cc.sequence(
                    action,
                    action.clone().reverse()
                )
            )
        },InputType.press,this)

        this.schedule(function(){
            if(balls.length)return
            if(_this.win.parent||_this.lose.parent){
                return
            }
            var index = Math.floor(Math.random()*6)
            var ball = new (balls_class[index])
            ball.collision.visible = false
            ball.point.visible = false
            scene.addChild(ball)
            balls.push(ball)
            ball.setPosition(cc.p(0,cc.winSize.height))

            this.scheduleOnce(function(){
                if(ball.parent){
                    ball.removeFromParent(true)
                    balls.splice(0,1)
                }

            },6)

        },4,99999999)


        this.scheduleUpdate()

        // 自定义事件
        var listener = cc.EventListener.create({
            event:cc.EventListener.CUSTOM,
            eventName:"other_catch",
            callback:function(event){
                var ball = balls[0]
                var my_point = lc.point.getWorldPoint(other.point)
                var ball_point = lc.point.getWorldPoint(ball.point)
                var space_x = ball_point.x - my_point.x
                var space_y = ball_point.y - my_point.y
                var space_point = cc.p(space_x,space_y)
                var action = cc.moveBy(0.2,space_point)
                _this.__other_action = action
                other.runAction(
                    cc.sequence(
                        action,
                        action.clone().reverse()
                    )
                )
            }
        })
        cc.eventManager.addListener(listener,1)

    },

    showGuide : function(){
        lcocos.fetchUserData()
        //lcocos.userData.hasGuide = null
        if(lcocos.userData.hasGuide){
           this.start()
            return
        }else{
            lcocos.userData.hasGuide = true
            lcocos.saveUserData()

            this.guide = new Guide()
            this.addChild(this.guide,12)
            this.guide.y = 600
            this.guide.runAction(
                cc.moveBy(0.2,cc.p(0,-600))
            )
        }
    },

    showLose : function(){
        if(!lc.isDebug){
            ggay()
        }
        this.unscheduleUpdate()
        this.lose.y = 600
        this.addChild(this.lose,13)
        this.lose.runAction(
            cc.moveBy(0.2,cc.p(0,-600))
        )
        //this.lose.setLocalScore(g.local_score)
        lcocos.fetchUserData()
        if(!lcocos.userData.score){
            lcocos.userData.score = 0
        }
        if(lcocos.userData.score < g.local_score){
            lcocos.userData.score = g.local_score
        }
        lcocos.saveUserData()
        //this.lose.setBestScore(lcocos.userData.score)
        //this._m.setString(g.local_score)
        this.____clear()
    },
    showWin : function(){
        if(!lc.isDebug){
            ggay()
        }
        this.unscheduleUpdate()
        this.win.y = 600
        this.addChild(this.win,13)
        this.win.runAction(
            cc.moveBy(0.2,cc.p(0,-600))
        )
        //this.win.setLocalScore(g.local_score)
        lcocos.fetchUserData()
        if(!lcocos.userData.score){
            lcocos.userData.score = 0
        }
        if(lcocos.userData.score < g.local_score){
            lcocos.userData.score = g.local_score
        }
        lcocos.saveUserData()
        //this.win.setBestScore(lcocos.userData.score)
        //this._m.setString(g.local_score)
        this.____clear()
    },

    ____sl : function(content){
        var size = cc.winSize
        if(!this.levelLabel){
            this.levelLabel = new cc.LabelTTF("","Arail",60)
        }
        if(!this.levelLabel.parent){
            this.addChild(this.levelLabel)
        }
        this.levelLabel.visible = true
        this.levelLabel.setPosition(cc.p(size.width/2,size.height-280))
        this.levelLabel.setString(content)
        this.levelLabel.setColor(cc.color(235,242,9,255))

        this.scheduleOnce(function(){
           this.levelLabel.visible = false
            var _this = this
            //var beganPoint = null
            //var listener = lcocos.event.getListener(
            //    // began handler
            //    function(touch,event){
            //        beganPoint = touch.getLocation()
            //        var point = _this.player.getPosition()
            //        if(!_this.player.isRunning){
            //            if(point.x < 240){
            //                _this.player.move('right')
            //            }else{
            //                _this.player.move('left')
            //            }
            //        }
            //    },
            //    // move handler
            //    function(touch,event){},
            //    // ended handler
            //    function(touch,event){
            //
            //    }
            //)
            //cc.eventManager.addListener(listener, this);

        },2)
    },

    ____clear : function(){

    }
})