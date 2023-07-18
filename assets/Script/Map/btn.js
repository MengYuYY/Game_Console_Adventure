
cc.Class({
    extends: cc.Component,

    properties: {
        btn: cc.Node,
        bricks:[cc.Node]
    },
    onLoad() {
        for (let i = 0; i < this.bricks.length; i++){
            this.bricks[i].active = false;
        }
        cc.director.getCollisionManager().enabled = true;
    },
    start () {
        
    },
    onCollisionEnter(other, self) {
        if (other.node.group == 'Player') {         
            this.btn.destroy();
            for (let i = 0; i < this.bricks.length; i++){
                this.bricks[i].active = true;
            }
        }
    }
});
