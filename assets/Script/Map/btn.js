
cc.Class({
    extends: cc.Component,

    properties: {
        btn: cc.Node,
        brick1: cc.Node,
        brick2:cc.Node
    },
    onLoad() {
        this.brick1.active = false;
        this.brick2.active = false;
        cc.director.getCollisionManager().enabled = true;
    },
    start () {
        
    },
    onCollisionEnter(other, self) {
        if (other.node.group == 'Player') {         
            this.btn.destroy();
            this.brick1.active = true;
            this.brick2.active = true;
        }
    }
});
