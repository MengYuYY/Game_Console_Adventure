cc.Class({
    extends: cc.Component,

    properties: {
        isGround: true,
		isTouchLadder: false,
		isFall: false,
		isReset: false
    },

	//判断是否触碰到梯子和是否从空中解除地面
	onCollisionStay: function (other, self) {
		if (other.node.group == 'Ladder')
			this.isTouchLadder = true; 
		if (!this.isGround && other.node.group == 'Map'){
			this.isGround = true;
			this.isReset = true;
		}
	},

	//判断是否离开梯子和是否从梯子上坠落以及是否位于地面
	onCollisionExit: function (other, self) {
		if (other.node.group == 'Ladder'){
			this.isTouchLadder = false;
			if(!this.isGround)
				this.isFall = true;
		}
		if (other.node.group == 'Map')
			this.isGround = false;
	},
});
