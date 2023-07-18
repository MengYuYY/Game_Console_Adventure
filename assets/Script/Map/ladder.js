
cc.Class({
    extends: cc.Component,

    properties: {
        mapNode: cc.Node,
        
    },
    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        //cc.director.getCollisionManager().debugDrawFlags = true;
        //cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        this.initMapNode(this.mapNode);
    },
    initMapNode(mapNode) {
        let tileMap = mapNode.getComponent(cc.TiledMap);
        let tiledSize = tileMap.getTileSize();
        let layer = tileMap.getLayer('ladder');
        let layerSize = layer.getLayerSize();
        console.log(layerSize);
        for (let i = 0; i < layerSize.width; i++){
            for (let j = 0; j < layerSize.height; j++){
                let tiled = layer.getTiledTileAt(i, j, true);
                if (tiled.gid != 0) {
                    tiled.node.group = 'Ladder';
                    let body = tiled.node.addComponent(cc.BoxCollider);
                    body.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2);
                    body.size = tiledSize;
                }
            }
        }
    },
    
    start () {

    },

});
