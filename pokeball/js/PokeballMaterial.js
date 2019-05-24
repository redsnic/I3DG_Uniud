export class PokeballMaterial {

    constructor() {
        this._color = null;
        this._map = null; // texture for the color
        this._metalness = null;
        this._roughness = null;
        this._roughnessMap = null;
        this._envMap = null;
        this._normalMap = null;
    }

    setColor(color) { this._color = color; }
    getColor() { return this._color; }

    setMap(map) { this._map = map; }
    getMap() { return this._map; }

    setMetalness(met) { this._metalness = met; }
    getMetalness() { return this._metalness; }

    setRoughness(roughness) { this._roughness = roughness; }
    getRoughness() { return this._roughness; }

    setRoughnessMap(rm) { this._roughnessMap = rm; }
    getRoughnessMap() { return this._roughnessMap; }

    setEnvMap(em) { this._envMap = em; }
    getEnvMap() { return this._envMap; }

    setNormalMap(nm) { this._normalMap = nm; }
    getNormalMap() { return this._normalMap; }

    createMaterial(){

    }

    createMaterialFromTexture(){

    }

    createMaterialFromValue(){
        
    }

}