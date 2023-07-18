
cc.Class({
    extends: cc.Component,

    properties: {
        mapNode: cc.Node,
        
    },
    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        //cc.director.getPhysicsManager().debugDrawFlags = true;
        cc.director.getCollisionManager().enabled = true;
        //cc.director.getCollisionManager().debugDrawFlags = true;
        //cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        this.initMapNode(this.mapNode);
    },
    initMapNode(mapNode) {
        let tileMap = mapNode.getComponent(cc.TiledMap);
        let tiledSize = tileMap.getTileSize();
        let layer = tileMap.getLayer('road');
        let layerSize = layer.getLayerSize();
        console.log(layerSize);
        for (let i = 0; i < layerSize.width; i++){
            for (let j = 0; j < layerSize.height; j++){
                let tiled = layer.getTiledTileAt(i, j, true);
                if (tiled.gid != 0) {
                    tiled.node.group = 'Map';
                    let body = tiled.node.addComponent(cc.RigidBody);
                    let body2 = tiled.node.addComponent(cc.BoxCollider);
                    body.type = cc.RigidBodyType.Static;
                    let collider = tiled.node.addComponent(cc.PhysicsBoxCollider);
                    collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2);
                    collider.size = tiledSize;
                    body2.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2);
                    body2.size = tiledSize;
                    collider.apply();
                }
            }
        }
    },
    
    start () {

    },

});
