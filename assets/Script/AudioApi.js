// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //玩家音效
        playerAudios:{
            default:null,
            type:[cc.AudioClip],
            visiable:false,
        },

        //敌人音效
        enemyAudios:{
            default:null,
            type:[cc.AudioClip],
            visiable:false,
        },

        //场景音效
        sceneAudios:{
            default:null,
            type:[cc.AudioClip],
            visiable:false,
        }
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},



/**
 * 
 * 玩家音效部分
 * 使用前把 @propertis 中 @playerAudios 的 @visiable 改为 @true
 * 方便后面导入资源
 * 
 * **/


    //走
    playerWalk(){
        //cc.audioEngine.playEffect(this.playerAudios[]);
    },

    //跳
    playerJump(){
        //cc.audioEngine.playEffect(this.playerAudios[]);
    },

    //落地
    playerFall(){
        //cc.audioEngine.playEffect(this.playerAudios[]);
    },

    //受伤
    playerHurt(){
        //cc.audioEngine.playEffect(this.playerAudios[]);
    },

    //获得钥匙
    playerGetKey(){
        //cc.audioEngine.playEffect(this.playerAudios[]);
    },

    //获得钻石
    playerGetDiamond(){
        //cc.audioEngine.playEffect(this.playerAudios[]);
    },

    //打开门
    playerOpenDoor(){
        //cc.audioEngine.playEffect(this.playerAudios[]);
    },

    //通过传送门
    playerPortal(){
        //cc.audioEngine.playEffect(this.playerAudios[]);
    },

    //攀爬
    playerClimb(){
        //cc.audioEngine.playEffect(this.playerAudios[]);
    },

    //蹲下
    playerDuck(){
        //cc.audioEngine.playEffect(this.playerAudios[]);
    },
});
