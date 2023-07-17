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
        portalEnable: true
    },
    
    GetDiamond(){
        this.score++;
    },

    GiveKey(){
        cc.find('Blank_Key', this.node).destroy();
        cc.find('Key', this.node).active = true;
    },

    GetKey(){
        cc.find('Door', this.node).destroy();
        cc.find('Blank_Door', this.node).active = true;
    },

    EnterPortal(){
        this.scheduleOnce(() => {
            this.portalEnable = true;
        }, this.portalColdTime)
    },

    GameVictory(){
        console.log('GameVictory')
    },

    GameOver(){

    },

    update(dt) {
        if(this.score == this.goalScore){
            this.goalScore = 0;
            this.GiveKey();
        }
    },
});
