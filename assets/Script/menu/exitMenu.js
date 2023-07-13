// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //加载触碰音效
        this.touchSound = this.node.parent.getChildByName("Canvas").getComponent("menu").touchSound;
    },

    start () {

    },

    //退出游戏
    clickYes(){
        cc.game.end();
    },

    //不退出游戏，收回菜单
    clickNo(){
        cc.audioEngine.playEffect(this.touchSound);
        let father = this.node.parent;
        cc.tween(this.node).to(0.1,{y:200,opacity:0}).call(()=>{
            father.getChildByName("menu Block").active=false;
        }).start();
    },

    // update (dt) {},
});
