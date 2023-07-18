// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        touchSound:{
            default:null,
            type:cc.AudioClip,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.updateOptions();
    },

    start () {

    },

    clickSave(){
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
        cc.tween(this.node).by(0.5,{y:600},{easing:"elasticIn"}).call(()=>{
            this.updateOptions();
            if(this.node.parent.getChildByName("menu Block")!=null)
                this.node.parent.getChildByName("menu Block").active=false;
            this.node.destroy();
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

    clickReturn(){
        cc.director.loadScene("menu");
    }

    // update (dt) {},
});
