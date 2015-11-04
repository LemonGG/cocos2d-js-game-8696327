/**
 * Created by Leo on 2015/11/2.
 */


var Ball_1 = BaseBall.extend({
    ctor : function(){
        this._super()

        this.resPath = res.gs_scene
        this.mcName = 'ball_1'

        this.render()
    }
})