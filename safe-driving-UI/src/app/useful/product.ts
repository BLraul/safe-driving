export interface TestCarDetails {
    products: Product[];
}

export interface Product {
    id?:number;
    productName?: string;
    categoryId?:number;
    description?: string;
    price?: number;
    prodImg?:string;
    isAvailable?: string;
    color?: string;
    efficiency?: number;
    performance?: number;
    transmission?: string;
    tnr?: number;
    audioSist?: string;
    trunkVol?: number;
    additionalTrunkSpace?: string;
    wifiCharging?: string;
    usbCharging?: string;
    centralDisplay?: string;
    eCallSistem?: string;
    autoPilot?:string;
    pcaR?: string;
    lvda?: string;
    isla?: string;
    parkingSensors?: string;
    testCarCode?: string;
    programings?: [];
}