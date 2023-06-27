import { Injectable } from '@angular/core';
import { PositionZoom } from 'src/app/useful/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PositionZoomService {
  positionAndZoom: PositionZoom[] = [];
  constructor() { }

  addToStore(data: PositionZoom) {
    this.positionAndZoom.push(data);
  }

  getPositionAndZoom() {
    return this.positionAndZoom;
  }
  
  getLatesZoom() {
    if (!!this.positionAndZoom){
      let latesPositionAndZoom = this.positionAndZoom[this.positionAndZoom.length-1].zoom;
      return latesPositionAndZoom;
    }
  }

  clearStore() {
    this.positionAndZoom = [];
    return this.positionAndZoom;
  }
}
