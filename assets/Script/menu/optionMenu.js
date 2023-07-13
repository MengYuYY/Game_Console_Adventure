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
        this.updateOptions();
        //加载触碰音效
        this.touchSound = this.node.parent.getChildByName("Canvas").getComponent("menu").touchSound;
    },

    start () {

    },

    clickSave(){
        console.log("save");
        cc.audioEngine.playEffect(this.touchSound);
        //保存音频设置
        cc.audioEngine.setMusicVolume(this.sliders[0].progress);
        //保存音效设置
        cc.audioEngine.setEffectsVolume(this.sliders[1].progress);

        //收回设置菜单
        this.clickCross();
    },

    clickCross(){
        console.log("cross");
        cc.audioEngine.playEffect(this.touchSound);
        //收回设置菜单
        cc.tween(this.node).to(0.5,{y:900},{easing:"elasticIn"}).call(()=>{
            this.updateOptions();
            this.node.parent.getChildByName("menu Block").active=false;
        }).start();
    },

    updateOptions(){
        //获取所有slider组件
        this.sliders = this.node.getComponentsInChildren(cc.Slider);
        //第0个为音频slider
        this.sliders[0].progress = cc.audioEngine.getMusicVolume();
        //第1个为音效slider
        this.sliders[1].progress = cc.audioEngine.getEffectsVolume();
    },

    // update (dt) {},
});
