/**
 * Created by Leo on 2015/11/2.
 */


var Ball_2 = BaseBall.extend({
    ctor : function(){
        this._super()

        this.resPath = res.gs_scene
        this.mcName = 'ball_2'

        this.render()
    }
})