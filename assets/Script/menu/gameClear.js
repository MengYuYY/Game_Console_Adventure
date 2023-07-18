// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        touch:{
            default:null,
            type:cc.AudioClip,
        },

        win:{
            default:null,
            type:cc.AudioClip,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //停止所有音效
        cc.audioEngine.stopAllEffects();
        //播放通关背景音乐
        cc.audioEngine.playMusic(this.win,true);
    },

    start () {

    },

    // update (dt) {},

    clickNext(){
        //播放点击按钮音效
        cc.audioEngine.playEffect(this.touch);
        let next = parseInt(cc.sys.localStorage.getItem("NowQuest"))+1;
        console.log(next);
        if(next<=9){
            cc.director.loadScene("game0"+next);
        }
        else{
            cc.director.loadScene("menu");
        }
    },

    clickExit(){
        cc.audioEngine.playEffect(this.touch);
        cc.director.loadScene("menu");
    },

    titleLoadOver(){
        let btn1 = this.node.getChildByName("next");
        let btn2 = this.node.getChildByName("exit");
        cc.tween(btn1).to(0.5,{opacity:255}).call(()=>{
            btn1.getComponent(cc.Button).interactable=true;
        }).start();

        cc.tween(btn2).to(0.5,{opacity:255}).call(()=>{
            btn2.getComponent(cc.Button).interactable=true;
        }).start();
    },
});
