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
		//判断是否触碰到梯子
		if (other.node.group == 'Ladder')
			this.isTouchLadder = true; 
		//判断是否从空中接触地面
		if (!this.isGround && other.node.group == 'Map'){
			this.isGround = true;
			this.isReset = true;
		}
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
		if (other.node.group == 'Map')
			this.isGround = false;
	},
});
