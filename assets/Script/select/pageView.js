// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        moveTime:{
            default:0.5,
            type: Number,
        },
        nonSelectOpacity:{
            default:120,
            type: Number,
        },
        selectScale:{
            default:1.2,
            type:Number,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //每个节点间隔按250计算

        //注册触摸监听事件
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.moveToSelect,this);

        //初始化触发滑动的flag
        this.actionFlag=false;

        //初始化当前选中节点,存储的为节点下标
        this.select = 1;
    },

    //鼠标在视图移动
    moveToSelect(e){
        //获取x轴移动距离
        let moveX = e.getDelta().x;

        let items = this.node.children;
        if(moveX > this.node.width/40){
            //鼠标向右划
            this.solveMove(1);
        }else if(moveX < -this.node.width/40){
            //鼠标向左划
            this.solveMove(-1);
        }
    },

    //根据滑动方向做出处理
    solveMove(arrow){
        //滑动未在执行中
        if(this.actionFlag==false){
            //上锁
            this.actionFlag=true;

            let items = this.node.children;

            //预先创建边界缓动
            let leftBlock = cc.tween().by(0.1,{x:-30})
            let rightBlock = cc.tween().by(0.1,{x:30});
            
            //计算下一个会被选中的节点
            nextSelect = this.select-arrow;

            if(nextSelect < 0){
                    cc.tween(items[0]).sequence(rightBlock,leftBlock).call(()=>{
                        this.actionFlag=false;
                    }).start();

            }else if(nextSelect >=items.length){
                    cc.tween(items[items.length-1]).sequence(leftBlock,rightBlock).call(()=>{
                        this.actionFlag=false;
                    }).start();
            }else{
                //view中节点全部进行缓动
                for(let i=0;i<items.length;i++){
                    cc.tween(items[i]).by(this.moveTime,{
                        x:arrow*250,
                        opacity:i==this.select?this.nonSelectOpacity-255:(i==nextSelect?255:0),
                        scale:i==this.select?1-this.selectScale:(i==nextSelect?this.selectScale-1:0),
                    }).call(()=>{
                        //最后一个进行缓动的节点在缓动结束后更新当前选中节点并解锁
                        this.select=nextSelect;
                        if(i==items.length-1){
                            this.actionFlag=false;
                        }
                    }).start();
                }
            }
        }
    },

    start () {

    },

    // update (dt) {},
});
