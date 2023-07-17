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
        cc.audioEngine.playMusic(this.win,true);
    },

    start () {

    },

    // update (dt) {},

    clickNext(){
        // cc.audioEngine.playEffect(this.touch);
        // if(this.关卡编号+1<=最后一关编号){
        //     cc.director.loadScene(下一关编号);
        // }
        // else{
        //     cc.director.loadScene("menu");
        // }
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
