let setMaterial = function(material, name){

    if(name="test"){
        changeMaterial( material, new THREE.Vector3(0.5,0.5,0) , loadTexture('textureWood.jpg'), 1, 1.,  loadTexture('textureWood.jpg') );
    }

}

let changeMaterial =  function( material, color, map, metalness, roughness, normalMap ){
    material.color = color;
    material.map = map; // texture for the color
    material.metalness = metalness;
    material.roughness = roughness;
    material.roughnessMap =  loadTexture('textureWood.jpg');
    material.envMap = globalHDRCubeRenderTarget.texture;
    material.normalMap = normalMap;
}