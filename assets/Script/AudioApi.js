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
            default:[],
            type:cc.AudioClip,
        },

        // //敌人音效
        // enemyAudios:{
        //     default:[],
        //     type:cc.AudioClip,
        // },

        //场景以及物品音效
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

    stopEffects(type){
        if(type==0){
            cc.audioEngine.stopEffect(this.walkID);
        }else if(type==1){
            cc.audioEngine.stopEffect(this.climbID);
        }
    },



/**
 * 
 * 
 * 玩家音效部分
 * 
 * 
 * **/


    //走
    playerWalk(){
        this.walkID = cc.audioEngine.playEffect(this.playerAudios[0],true);
    },

    //跳
    playerJump(){
        cc.audioEngine.playEffect(this.playerAudios[1]);
    },

    //落地
    playerFall(){
        cc.audioEngine.playEffect(this.playerAudios[2]);
    },

    //攀爬
    playerClimb(){
        this.climbID = cc.audioEngine.playEffect(this.playerAudios[3],true);
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
        let i = parseInt((Math.random() * 20 )% 5);
        cc.audioEngine.playMusic(this.sceneAudios[i],true);
    },

    //获得钥匙
    sceneGetKey(){
        cc.audioEngine.playEffect(this.sceneAudios[5]);
    },

    //获得钻石
    sceneGetDiamond(){
        cc.audioEngine.playEffect(this.sceneAudios[6]);
    },

    //打开门
    sceneOpenDoor(){
        cc.audioEngine.playEffect(this.sceneAudios[7]);
    },

    //通过传送门
    scenePortal(){
        cc.audioEngine.playEffect(this.sceneAudios[8]);
    },

    //给钥匙
    sceneGiveKey(){
        cc.audioEngine.playEffect(this.sceneAudios[9]);
    }

    // //受伤
    // playerHurt(){
    //     //cc.audioEngine.playEffect(this.playerAudios[3]);
    // },
});

