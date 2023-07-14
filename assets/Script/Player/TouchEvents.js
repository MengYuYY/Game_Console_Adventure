cc.Class({
    extends: cc.Component,

    onLoad () {
        this.player = cc.find('Canvas/Player').getComponent('PlayerControl');

        cc.find('Button-Up', this.node).on('touchstart', () => {
            this.player.UpBegin();
        });
        cc.find('Button-Down', this.node).on('touchstart', () => {
            this.player.DownBegin();
        });
        cc.find('Button-Left', this.node).on('touchstart', () => {
            this.player.LeftBegin();
        });
        cc.find('Button-Right', this.node).on('touchstart', () => {
            this.player.RightBegin();
        });
        cc.find('Button-Jump', this.node).on('touchstart', () => {
            this.player.JumpBegin();
        });

        cc.find('Button-Up', this.node).on('touchend', () => {
            this.player.UpEnd();
        });
        cc.find('Button-Down', this.node).on('touchend', () => {
            this.player.DownEnd();
        });
        cc.find('Button-Left', this.node).on('touchend', () => {
            this.player.LeftEnd();
        });
        cc.find('Button-Right', this.node).on('touchend', () => {
            this.player.RightEnd();
        });
        cc.find('Button-Jump', this.node).on('touchend', () => {
            this.player.JumpEnd();
        });

        cc.find('Button-Up', this.node).on('touchcancel', () => {
            this.player.UpEnd();
        });
        cc.find('Button-Down', this.node).on('touchcancel', () => {
            this.player.DownEnd();
        });
        cc.find('Button-Left', this.node).on('touchcancel', () => {
            this.player.LeftEnd();
        });
        cc.find('Button-Right', this.node).on('touchcancel', () => {
            this.player.RightEnd();
        });
        cc.find('Button-Jump', this.node).on('touchcancel', () => {
            this.player.JumpEnd();
        });
    },

});
