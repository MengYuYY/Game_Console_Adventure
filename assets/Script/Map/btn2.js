cc.Class({
    extends: cc.Component,

    properties: {
        btn: cc.Node,
        brick: cc.Node,
    },
    onLoad() {
        this.brick.active = true;
        cc.director.getCollisionManager().enabled = true;
    },
    start () {
        
    },
    onCollisionEnter(other, self) {
        if (other.node.group == 'Player') {         
            this.btn.destroy();
            this.brick.active = false;
        }
    }
});