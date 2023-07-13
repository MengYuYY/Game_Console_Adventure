// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

	PlayerClimbAnim() {
		let anim = this.node.getComponent(cc.Animation);
		let animState = anim.play('PlayerClimb');
		animState.wrapMode = cc.WrapMode.Loop;
	},

	PlayerDuckAnim() {
		let anim = this.node.getComponent(cc.Animation);
		let animState = anim.play('PlayerDuck');
		animState.wrapMode = cc.WrapMode.Loop;
	},

	PlayerHappyAnim() {
		let anim = this.node.getComponent(cc.Animation);
		let animState = anim.play('PlayerHappy');
		animState.wrapMode = cc.WrapMode.Loop;
	},

	PlayerIdleAnim(){
		let anim = this.node.getComponent(cc.Animation);
		let animState = anim.play('PlayerIdle');
		animState.wrapMode = cc.WrapMode.Loop;
	},

	PlayerJumpAnim() {
		let anim = this.node.getComponent(cc.Animation);
		let animState = anim.play('PlayerJump');
		animState.wrapMode = cc.WrapMode.Loop;
	},

	PlayerWalkAnim(){
		let anim = this.node.getComponent(cc.Animation);
		let animState = anim.play('PlayerWalk');
		animState.wrapMode = cc.WrapMode.Loop;
	},

});
