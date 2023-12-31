cc.Class({
    extends: cc.Component,

    properties: {
        isGround: true,
		isTouchLadder: false,
		isFall: false,
		isReset: false,
		isDeath: false
    },

	onCollisionStay: function (other, self) {
		if(other.node.group == 'Map')
			this.unschedule(this.callback);
		//判断是否触碰到梯子
		if (other.node.group == 'Ladder')
			this.isTouchLadder = true; 
		//判断是否从空中接触地面
		if (!this.isGround && other.node.group == 'Map'){
			this.isGround = true;
			this.isReset = true;
		}
		//判断是否接触陷阱
		if(other.node.group == 'Trap')
			this.isDeath = true;
	},

	onCollisionExit: function (other, self) {
		//判断是否离开梯子
		if (other.node.group == 'Ladder'){
			this.isTouchLadder = false;
			//判断是否从梯子上坠落
			if(!this.isGround)
				this.isFall = true;
		}
		//判断是否位于地面
		if (other.node.group == 'Map'){
			this.callback = () => {
				this.isGround = false;
			}
			this.scheduleOnce(this.callback, 0.01);	
		}		
	},
});
