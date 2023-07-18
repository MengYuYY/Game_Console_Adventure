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
		health: 100,
		gravity: cc.v2(0, -640)
    },

	onLoad: function () {
		//开启物理系统和碰撞检测
		cc.director.getPhysicsManager().enabled = true;
		cc.director.getCollisionManager().enabled = true;
		// cc.director.getCollisionManager().enabledDebugDraw = true;
		//注册键盘事件
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
		//获取组件
		this.anim = this.node.getComponent('PlayerAnim');
		this.rb = this.node.getComponent(cc.RigidBody);
		this.physicsCheck = this.node.getComponent('StatusCheck');
		//初始化标志
		this.isUp = false;
		this.isDown = false;
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


	//左右方向键若同时按下,令后输入直接替代前输入,上下同理
	onKeyDown: function (event) {
		switch (event.keyCode) {
			case cc.macro.KEY.w:
				this.UpBegin();
				break;
			case cc.macro.KEY.a:
				this.LeftBegin();
				break;
			case cc.macro.KEY.s:
				this.DownBegin();				
				break;
			case cc.macro.KEY.d:
				this.RightBegin();	
				break;
			case cc.macro.KEY.k:
				this.JumpBegin();
				break;
		}
	},

	onKeyUp: function (event) {
		switch (event.keyCode) {
			case cc.macro.KEY.w:
				this.UpEnd();
				break;
			case cc.macro.KEY.a:
				this.LeftEnd();
				break;
			case cc.macro.KEY.s:
				this.DownEnd();				
				break;
			case cc.macro.KEY.d:
				this.RightEnd();	
				break;
			case cc.macro.KEY.k:
				this.JumpEnd();
				break;
		}
	},					
	
	//碰到梯子，且不处于向上移动状态，则将向上移动标志置位true，攀爬标志置为true，且清零y方向速度并播放攀爬动画
	UpBegin(){
		if (!this.isUp && this.physicsCheck.isTouchLadder) {
			this.isUp = true;
			this.isDown = false;
			this.isClimb = true;
			this.rb.linearVelocity = cc.v2(0, 0);
			this.anim.PlayerClimbAnim();
		}
	},
	//未碰到梯子，且不处于下蹲状态，则将下蹲标志置位true且播放下蹲动画
	//碰到梯子，且不处于向下移动状态同时不在地面，则将向下移动标志置位true，攀爬标志置为true, 且清零y方向速度并播放攀爬动画
	DownBegin(){
		if (!this.isDuck && this.physicsCheck.isGround) {
			this.isDuck = true;
			this.anim.PlayerDuckAnim();
		}
		if (!this.isDown && this.physicsCheck.isTouchLadder && !this.physicsCheck.isGround) {
			this.isDown = true;
			this.isUp = false;
			this.isClimb = true;
			this.rb.linearVelocity = cc.v2(0, 0);
			this.anim.PlayerClimbAnim();
		}
	},
	//向左移动且不是蹲下状态时,则将向左移动标志置为true,向右移动标志置位false,同时翻转玩家,若位于地面,则播放移动动画
	LeftBegin(){
		if (!this.isLeft && !this.isDuck){
			this.isLeft = true;
			this.isRight = false;
			this.node.scaleX = -Math.abs(this.node.scaleX);
			if (this.physicsCheck.isGround)
				this.anim.PlayerWalkAnim();
		}
	},
	//向右移动且不是蹲下状态时,则将向左移动标志置为false,向右移动标志置位true,若位于地面,则播放移动动画
	RightBegin(){
		if (!this.isRight && !this.isDuck){
			this.isRight = true;
			this.isLeft = false;
			this.node.scaleX = Math.abs(this.node.scaleX);
			if (this.physicsCheck.isGround)
				this.anim.PlayerWalkAnim();
		}
	},
	//位于地面时进行跳跃
	JumpBegin(){
		if(!this.isJump && this.physicsCheck.isGround){
			this.isJump = true;
			this.rb.linearVelocity = cc.v2(0, this.jumpHeight);	
			this.anim.PlayerJumpAnim();
		}
	},
	//松开w时若位于梯子上，则将向上移动标志置为false且暂停攀爬动画
	UpEnd(){
		if (this.physicsCheck.isTouchLadder) {
			this.isUp = false;
			this.anim.PasuePlayerClimbAnim();
		}
	},
	//松开s时若位于梯子上，则将向下移动标志置为false,且暂停攀爬动画，若位于地面上则下蹲
	DownEnd(){
		if(this.physicsCheck.isGround){
			this.isDuck = false;
			this.anim.PlayerIdleAnim();
		}else if(this.physicsCheck.isTouchLadder) {
			this.isDown = false;
			this.anim.PasuePlayerClimbAnim();
		}
	},					
	//松开a时若没有按下d,将向右移动标志置位false,且不处于蹲下和攀爬状态，则播放待机动画
	LeftEnd(){
		this.isLeft = false;
		if (!this.isRight && !this.isDuck && !this.isClimb)
		this.anim.PlayerIdleAnim();		
	},
	//松开d时若没有按下a,将向右移动标志置位false，且不处于蹲下和攀爬状态，则播放待机动画	
	RightEnd(){
		this.isRight = false;
				if (!this.isLeft && !this.isDuck && !this.isClimb)
				this.anim.PlayerIdleAnim();
	},
	//松开k时将跳跃标志置为false
	JumpEnd(){
		this.isJump = false;
	},
	//移动
	Move(dt){
		//非蹲下状态时检测左右移动
		if(!this.isDuck){
			if(this.isLeft)
				this.node.x -= this.speed * dt;
			if(this.isRight)
				this.node.x += this.speed * dt;
		}
		//攀爬状态时检测上下移动
		if(this.isClimb){
			if (this.isUp)
				this.node.y += this.speed * dt;
			if (this.isDown)
				this.node.y -= this.speed * dt;
		}
		//避免因碰撞而导致打滑现象
		this.rb.linearVelocity = cc.v2(0, this.rb.linearVelocity.y);
	},
	//玩家死亡
	Death(){
		console.log("death")
	},

    update (dt) {
		this.Move(dt);
		if(this.physicsCheck.isDeath)
			this.Death();
		//碰到地面或离开梯子范围，结束攀爬状态,重力回归正常
		if ((this.physicsCheck.isGround && this.isDown) || !this.physicsCheck.isTouchLadder){
			this.isClimb = false;
			cc.director.getPhysicsManager().gravity = this.gravity;
		}
		//开始攀爬，重力置为0
		if(this.isClimb)
			cc.director.getPhysicsManager().gravity = cc.v2(0, 0);
		//从空中接触地面，重置动画状态
		if (this.physicsCheck.isReset){
			if (this.isLeft ^ this.isRight)
				this.anim.PlayerWalkAnim();
			else
				this.anim.PlayerIdleAnim();
			this.physicsCheck.isReset = false;
		}
		//从梯子滑落，清除攀爬动画
		if(this.physicsCheck.isFall){
			this.anim.PlayerIdleAnim();
			this.physicsCheck.isFall = false;
		}
	},
});
