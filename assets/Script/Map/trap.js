
cc.Class({
    extends: cc.Component,

    properties: {
        trap:cc.Node
    },
    onLoad() {
        // 开启碰撞系统
        cc.director.getCollisionManager().enabled = true;
    },
    start () {

    },
    onCollisionEnter(other, self) {
        other.node.destory();
    },
});
