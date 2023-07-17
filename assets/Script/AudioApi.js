// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

window.audios = cc.Class({
    extends: cc.Component,

    properties: {
        //玩家音效
        playerAudios:{
            default:[],
            type:cc.AudioClip,
        },

        // //敌人音效
        // enemyAudios:{
        //     default:[],
        //     type:cc.AudioClip,
        // },

        //场景音效
        sceneAudios:{
            default:[],
            type:cc.AudioClip,
        },

        //菜单音效
        menuAudios:{
            default:[],
            type:cc.AudioClip,
        },
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {
        
    // },

    start () {

    },

    // update (dt) {},



/**
 * 
 * 
 * 玩家音效部分
 * 
 * 
 * **/


    //走
    playerWalk(){
        //cc.audioEngine.playEffect(this.playerAudios[0]);
    },

    //跳
    playerJump(){
        //cc.audioEngine.playEffect(this.playerAudios[1]);
    },

    //落地
    playerFall(){
        //cc.audioEngine.playEffect(this.playerAudios[2]);
    },

    //受伤
    playerHurt(){
        //cc.audioEngine.playEffect(this.playerAudios[3]);
    },

    //获得钥匙
    playerGetKey(){
        //cc.audioEngine.playEffect(this.playerAudios[4]);
    },

    //获得钻石
    playerGetDiamond(){
        //cc.audioEngine.playEffect(this.playerAudios[5]);
    },

    //打开门
    playerOpenDoor(){
        //cc.audioEngine.playEffect(this.playerAudios[6]);
    },

    //通过传送门
    playerPortal(){
        //cc.audioEngine.playEffect(this.playerAudios[7]);
    },

    //攀爬
    playerClimb(){
        //cc.audioEngine.playEffect(this.playerAudios[8]);
    },

    //蹲下
    playerDuck(){
        //cc.audioEngine.playEffect(this.playerAudios[9]);
    },


/**
 * 
 * 
 * 菜单音效部分
 * 
 * 
 * **/

    // //点击选项
    menuTouch(){
        cc.audioEngine.playEffect(this.menuAudios[0]);
    },

    //滑动选关列表
    menuSelectMove(){
        cc.audioEngine.playEffect(this.menuAudios[1]);
    },

    //选关列表禁止滑动
    menuSelectDisable(){
        cc.audioEngine.playEffect(this.menuAudios[2]);
    },

    //开始游戏
    menuGameStart(){
        cc.audioEngine.stopMusic();
        cc.audioEngine.playEffect(this.menuAudios[3]);
    },

/**
 * 
 * 
 * 场景音效部分
 * 
 * 
 * **/


    //背景音乐
    sceneBackground(){
        //随机选择背景音乐播放
        let i = parseInt(Math.random()*20%4);
        cc.audioEngine.playMusic(this.sceneAudios[i],true);
    }
});

