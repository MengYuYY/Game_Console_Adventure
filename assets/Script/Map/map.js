
cc.Class({
    extends: cc.Component,

    properties: {
        mapNode: cc.Node,
        
    },
    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        //cc.director.getPhysicsManager().debugDrawFlags = true;
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
                    tiled.node.group = 'map';
                    let body = tiled.node.addComponent(cc.RigidBody);
                    body.type = cc.RigidBodyType.Static;
                    let collider = tiled.node.addComponent(cc.PhysicsBoxCollider);
                    collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2);
                    collider.size = tiledSize;
                    collider.apply();
                }
            }
        }
    },
    
    start () {

    },

});
