// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 200,
		jumpHeight: 1000,
		health: 100
    },

	onLoad: function () {
		cc.director.getPhysicsManager().enabled = true;


		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
		
		this.anim = this.node.getComponent('PlayerAnim');

		this.rb = this.node.getComponent(cc.RigidBody);

		this.isLeft = false;
		this.isRight = false;
		this.isClimb = false;
		this.isDuck = false;
		this.isJump = false;
	},

	onDestroy() {
		cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
		cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
	},


	//左右方向键若同时按下,令后输入直接替代前输入
	onKeyDown: function (event) {
		switch (event.keyCode) {
			case cc.macro.KEY.a:
				if (!this.isLeft && !this.isDuck){
					this.isLeft = true;
					this.isRight = false;
					this.node.scaleX = -Math.abs(this.node.scaleX);
					if (this.rb.linearVelocity.y == 0)
						this.anim.PlayerWalkAnim();
				}
				break;
			case cc.macro.KEY.s:
				if (!this.isDuck && this.rb.linearVelocity.y == 0) {
					this.isDuck = true;
					this.anim.PlayerDuckAnim();
				}
				break;
			case cc.macro.KEY.d:
				if (!this.isRight && !this.isDuck){
					this.isRight = true;
					this.isLeft = false;
					this.node.scaleX = Math.abs(this.node.scaleX);
					if (this.rb.linearVelocity.y == 0)
						this.anim.PlayerWalkAnim();
				}
				break;
			case cc.macro.KEY.k:
				if(!this.isJump && this.rb.linearVelocity.y == 0){
					this.isJump = true;
					this.rb.linearVelocity = cc.v2(0, this.jumpHeight);	
					this.anim.PlayerJumpAnim();
				}
				break;
		}
	},

	onKeyUp: function (event) {
		switch (event.keyCode) {
			case cc.macro.KEY.a:
				this.isLeft = false;
				if (!this.isRight && !this.isDuck)
					this.anim.PlayerIdleAnim();
				break;
			case cc.macro.KEY.s:
				this.isDuck = false;
				this.anim.PlayerIdleAnim();
				break;
			case cc.macro.KEY.d:
				this.isRight = false;
				if (!this.isLeft && !this.isDuck)
					this.anim.PlayerIdleAnim();
				break;
			case cc.macro.KEY.k:
				if (this.isJump) {
					this.isJump = false;
				}
				break;
		}
	},

	Move(dt){
		if(!this.isDuck){
			if(this.isLeft)
				this.node.x -= this.speed * dt;
			if(this.isRight)
				this.node.x += this.speed * dt;
		}
	},

    update (dt) {
		this.Move(dt);
		//落地且不移动不下蹲，播放待机动画
		if (!(this.isLeft ^ this.isRight) && this.rb.linearVelocity.y == 0 && !this.isDuck)
			this.anim.PlayerIdleAnim();
	},
});
