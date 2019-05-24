import { PokeballComponent } from "./PokeballComponent.js";

export class Pokeball {

    constructor(objPath) {
        this._top = null;
        this._bottom = null;
        this._ring = null;
        this._button = null;
        this._pivot = new THREE.Object3D();
        this._objPath = objPath;
        this._objReady = false;
    }

    loadComponents() {
        this._objReady = false;
        const loader = new THREE.OBJLoader2();
        loader.useIndices = true;
        loader.load(this._objPath, function (obj) {
            let top = new PokeballComponent(obj.detail.loaderRootNode.children[2].geometry);
            let bottom = new PokeballComponent(obj.detail.loaderRootNode.children[1].geometry);
            let ring = new PokeballComponent(obj.detail.loaderRootNode.children[3].geometry);
            let button = new PokeballComponent(obj.detail.loaderRootNode.children[0].geometry);
            globalPokeball.applyObj(top, bottom, ring, button);
        });
    }

    applyObj(top, bottom, ring, button) {
        this._top = top;
        this._bottom = bottom;
        this._ring = ring;
        this._button = button;
        this._objReady = true;
        this.updatePivot();
    }

    updatePivot() {
        this._pivot.add(this._top._object);
        this._pivot.add(this._bottom._object);
        this._pivot.add(this._button._object);
        this._pivot.add(this._ring._object);
    }

    isObjReady() {
        return this._objReady;
    }

    killme(i) {
        this._top._object.material.roughness = i+0.01;
    }

    applyMaterial(material) {
        this._top.applyMaterial(material);
        this._bottom.applyMaterial(material);
        this._ring.applyMaterial(material);
        this._button.applyMaterial(material);
    }

    applyMaterialToPart(part, material) {
        if(part=="top"){
            this._top.applyMaterial(material);
        }else if(part=="bottom"){
            this._bottom.applyMaterial(material);
        }else if(part=="ring"){
            this._ring.applyMaterial(material);
        }else if(part=="button"){
            this._button.applyMaterial(material);
        }
    }

}
