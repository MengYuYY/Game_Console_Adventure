// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        idName: 'deafult',
        goalPortal: cc.Node
    },

    onLoad(){
        this.GameControl = cc.find('background').getComponent('GameControl');   
	},

    onCollisionEnter: function (other, self) {
        //判断是否吃到钻石
        if(self.node.getComponent('ItemConfig').idName == 'Diamond'){
            this.GameControl.GetDiamond();
            this.node.destroy();
        }
        //判断是否吃到钥匙
        if(self.node.getComponent('ItemConfig').idName == 'Key'){
            this.GameControl.GetKey();
            this.node.destroy();
        }
        //判断是否进传送门
        if(self.node.getComponent('ItemConfig').idName == 'Portal'){
            if(this.GameControl.portalEnable){
                this.GameControl.portalEnable = false;
                other.node.position = this.goalPortal.position;
                this.GameControl.EnterPortal();
            }
        }
        //判断是否进门
        if(self.node.getComponent('ItemConfig').idName == 'Blank_Door')
            this.GameControl.GameVictory();         
	},
});
