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
        this.audioPlay = this.node.parent.getComponent("AudioApi");
    },

    start () {

    },

    clickReturn(){
        this.audioPlay.menuTouch();
        cc.director.loadScene("menu");
    },

    clickGameStart(){
        this.audioPlay.menuGameStart();
        this.node.parent.getChildByName("block").active=true;
        this.node.getComponent(cc.Animation).play("selectMenu");
    },

    loadGameScene(){
        let selected = this.node.getChildByName("selectView").getChildByName("content").getComponent("pageView").select;
        cc.director.loadScene("game0"+(selected+1));
    },

    loadSelectScene(){
        this.node.parent.getChildByName("block").active=false;
    }

    // update (dt) {},
});
