// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        score: 0,
        goalScore: 1,
        portalColdTime: 2,
        portalEnable: true,
        questID: 0,
        menuPrefab:{
            default:null,
            type:cc.Prefab,
        }
    },
    
    GetDiamond(){
        this.score++;

        //播放音效
        this.audioPlay.sceneGetDiamond();
    },

    GiveKey(){
        cc.find('Blank_Key', this.node).destroy();
        cc.find('Key', this.node).active = true;

        //播放音效
        this.audioPlay.sceneGiveKey();
    },

    GetKey(){
        cc.find('Door', this.node).destroy();
        cc.find('Blank_Door', this.node).active = true;

        //播放音效
        this.audioPlay.sceneGetKey();
    },

    EnterPortal(){
        this.scheduleOnce(() => {
            this.portalEnable = true;
        }, this.portalColdTime);

        //播放音效
        this.audioPlay.scenePortal();
    },

    GameVictory(){
        //加载游戏通关场景
        cc.director.loadScene("gameClear");
    },

    GameOver(){
        
    },

    update(dt) {
        if(this.score == this.goalScore){
            this.goalScore = 0;
            this.GiveKey();
        }
    },
    
    onLoad(){
        //导入音效组件
        this.audioPlay = this.node.getComponent("AudioApi");

        //存储当前加载的关卡id
        cc.sys.localStorage.setItem("NowQuest", this.questID);
    },

    start(){
        //播放背景音乐
        this.audioPlay.sceneBackground();
    },

    clickPause(){
        this.audioPlay.menuTouch();
        //根据预制体生成节点
        var pauseMenu = cc.instantiate(this.menuPrefab);
        pauseMenu.getChildByName("exit").active=true;
        var father = this.node.parent.getChildByName("Canvas");
        father.addChild(pauseMenu);
        pauseMenu.setPosition(0,father.height/2+120);
        pauseMenu.scale=0.5
        //菜单弹出动画
        cc.tween(pauseMenu).to(0.5,{y:0},{easing:"elasticOut"}).start();
    }
});
