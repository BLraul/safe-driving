import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { AccidentDetails } from 'src/app/useful/accident-details-interfaces';
import { setCommaSeparatedValuesInArray } from 'src/app/useful/utils';



const CAR_IMG_PATH = 'assets/images/accident_details/car.png';
const CHILD_IMG_PATH = 'assets/images/accident_details/child.png';
const AIRBAG_DRIVER_IMG_PATH = 'assets/images/accident_details/airbag-driver.png';
const AIRBAG_HEAD_DRIVER_IMG_PATH =
    'assets/images/accident_details/airbag-head-driver.png';
const AIRBAG_HEAD_PASSANGER_IMG_PATH =
    'assets/images/accident_details/airbag-head-passenger.png';
const AIRBAG_KNEE_IMG_PATH = 'assets/images/accident_details/airbag-knee.png';
const AIRBAG_PASSENGER_IMG_PATH =
    'assets/images/accident_details/airbag-passenger.png';
const AIRBAG_REAR_IMG_PATH = 'assets/images/accident_details/airbag-rear.png';
const AIRBAG_THORAX_DRIVER_IMG_PATH =
    'assets/images/accident_details/airbag-thorax-driver.png';
const AIRBAG_THORAX_PASSENGER_IMG_PATH =
    'assets/images/accident_details/airbag-thorax-passenger.png';
const HORIZONTAL_LINE_IMG_PATH =
    'assets/images/accident_details/horizontal-line.png';
const VERTICAL_LINE_IMG_PATH = 'assets/images/accident_details/vertical-line.png';
const ROLLOVER_IMG_PATH = 'assets/images/accident_details/rollover.png';
const PERSON_IMG_PATH = 'assets/images/accident_details/person.png';


@Component({
  selector: 'app-accident-details-graphics',
  templateUrl: './accident-details-graphics.component.html',
  styleUrls: ['./accident-details-graphics.component.scss']
})
export class AccidentDetailsGraphicsComponent implements OnChanges{
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  @Input() crashDetails: AccidentDetails;
  private ctx: CanvasRenderingContext2D;
  imgFinalCar;
  imgPerson;
  imgChild;
  imgAirbagDriver;
  imgAirbagHeadDriver;
  imgAirbagHeadPassenger;
  imgAirbagKnee;
  imgAirbagPassenger;
  imgAirbagRear;
  imgAirbagThoraxDriver;
  imgAirbagThoraxPassenger;
  imgHorizontalLine;
  imgVerticalLine;
  imgRollover;

  oldText: string;

  constructor() {
      this.imgPerson = new Image();
      this.imgPerson.src = PERSON_IMG_PATH;
      this.imgChild = new Image();
      this.imgChild.src = CHILD_IMG_PATH;
      this.imgAirbagDriver = new Image();
      this.imgAirbagDriver.src = AIRBAG_DRIVER_IMG_PATH;
      this.imgAirbagHeadDriver = new Image();
      this.imgAirbagHeadDriver.src = AIRBAG_HEAD_DRIVER_IMG_PATH;
      this.imgAirbagHeadPassenger = new Image();
      this.imgAirbagHeadPassenger.src = AIRBAG_HEAD_PASSANGER_IMG_PATH;
      this.imgAirbagKnee = new Image();
      this.imgAirbagKnee.src = AIRBAG_KNEE_IMG_PATH;
      this.imgAirbagPassenger = new Image();
      this.imgAirbagPassenger.src = AIRBAG_PASSENGER_IMG_PATH;
      this.imgAirbagRear = new Image();
      this.imgAirbagRear.src = AIRBAG_REAR_IMG_PATH;
      this.imgAirbagThoraxDriver = new Image();
      this.imgAirbagThoraxDriver.src = AIRBAG_THORAX_DRIVER_IMG_PATH;
      this.imgAirbagThoraxPassenger = new Image();
      this.imgAirbagThoraxPassenger.src = AIRBAG_THORAX_PASSENGER_IMG_PATH;
      this.imgHorizontalLine = new Image();
      this.imgHorizontalLine.src = HORIZONTAL_LINE_IMG_PATH;
      this.imgVerticalLine = new Image();
      this.imgVerticalLine.src = VERTICAL_LINE_IMG_PATH;
      this.imgRollover = new Image();
      this.imgRollover.src = ROLLOVER_IMG_PATH;
  }
  ngOnChanges(sc: SimpleChanges) {
      if (
          !!sc['crashDetails'] &&
          !!sc['crashDetails'].currentValue?.vehicle
      ) {
          this.crashDetails = sc['crashDetails'].currentValue;
          if (!this.crashDetails?.vehicle?.motorcycle) {
              this.clearText();
              this.drawGraphics();
          } else {
              this.cleanUpGraphics();
              this.clearText();
              this.displayText();
          }
      } else if (!sc['crashDetails'].currentValue.vehicle) {
          this.clearText();
          this.cleanUpGraphics();
      }
  }

  private displayText() {
      this.ctx = this.canvas.nativeElement.getContext('2d');
      this.ctx.font = '14pt';
      this.ctx.fillText(
          "Accident vehicle is a motorcycle.",
          0,
          280
      );
  }

  private clearText() {
      this.ctx = this.canvas.nativeElement.getContext('2d');
      this.ctx.clearRect(0, 0, 350, 450);
  }

  drawGraphics(): void {
      this.ctx = this.canvas.nativeElement.getContext('2d');
      this.ctx.font = '14pt BMWGroupTNCondensedTT-Light';
      this.cleanUpGraphics();

      this.imgFinalCar = new Image();
      this.imgFinalCar.src = CAR_IMG_PATH;
      this.imgFinalCar.onload = () => {
          this.ctx.drawImage(this.imgFinalCar, 0, 0);
          this.drawOcupantsGraphics();
          this.drawDeployedDriverAirgabsGraphics();
          this.drawDeployedPassengerAirgabsGraphics();
          this.drawDeployedRearAirgabsGraphics();
          this.drawVehicleorientationGraphics();
          this.drawCollisionsGraphics();
      };
  }

  cleanUpGraphics() {
      if (!!this.imgFinalCar && !!this.imgFinalCar.width) {
          var width = this.imgFinalCar.width;
          var height = this.imgFinalCar.height;
          this.ctx?.clearRect(0, 0, width, height);
          this.imgFinalCar = null;
      }
  }

  drawOcupantsGraphics() {
      if (!!this.crashDetails?.vehicle?.leftHandDrive) {
          //left-hand-drive
          this.ctx.drawImage(this.imgPerson, 65, 220);
          if (
              this.crashDetails?.seatbelts?.seatbeltFrontPassenger ===
              'belted'
          ) {
              if (this.crashDetails?.agentReport.occupantChild) {
                  this.ctx.drawImage(this.imgChild, 142, 220);
              } else {
                  this.ctx.drawImage(this.imgPerson, 142, 220);
              }
          }
          if (
              this.crashDetails?.seatbelts?.seatbeltRearDriverSide ===
              'belted'
          ) {
              this.ctx.drawImage(this.imgPerson, 65, 300);
          }
          if (
              this.crashDetails?.seatbelts?.seatbeltRearPassengerSide ===
              'belted'
          ) {
              this.ctx.drawImage(this.imgPerson, 142, 300);
          }
      } else {
          //right-hand-drive
          this.ctx.drawImage(this.imgPerson, 142, 220);
          if (
              this.crashDetails?.seatbelts?.seatbeltFrontPassenger ===
              'belted'
          ) {
              if (this.crashDetails?.agentReport.occupantChild) {
                  this.ctx.drawImage(this.imgChild, 65, 220);
              } else {
                  this.ctx.drawImage(this.imgPerson, 65, 220);
              }
          }
          if (
              this.crashDetails?.seatbelts?.seatbeltRearDriverSide ===
              'belted'
          ) {
              this.ctx.drawImage(this.imgPerson, 142, 300);
          }
          if (
              this.crashDetails?.seatbelts?.seatbeltRearPassengerSide ===
              'belted'
          ) {
              this.ctx.drawImage(this.imgPerson, 65, 300);
          }
      }

      if (this.crashDetails?.seatbelts?.seatbeltRearMiddle === 'belted') {
          //rear-middle-side
          this.ctx.drawImage(this.imgPerson, 102, 300);
      }
  }

  drawDeployedDriverAirgabsGraphics() {
      if (!!this.crashDetails?.vehicle?.leftHandDrive) {
          if (this.crashDetails?.airbags?.airbagDriverFront === 'fired') {
              this.ctx.drawImage(this.imgAirbagDriver, 72, 200);
          }
          if (this.crashDetails?.airbags?.airbagDriverHead === 'fired') {
              this.ctx.drawImage(this.imgAirbagHeadDriver, 55, 170);
          }
          if (this.crashDetails?.airbags?.airbagDriverKnee === 'fired') {
              this.ctx.drawImage(this.imgAirbagKnee, 70, 180);
          }
          if (this.crashDetails?.airbags?.airbagDriverThorax === 'fired') {
              this.ctx.drawImage(this.imgAirbagThoraxDriver, 54, 250);
          }
      } else {
          if (this.crashDetails?.airbags?.airbagDriverFront === 'fired') {
              this.ctx.drawImage(this.imgAirbagDriver, 144, 200);
          }
          if (this.crashDetails?.airbags?.airbagDriverHead === 'fired') {
              this.ctx.drawImage(this.imgAirbagHeadDriver, 180, 170);
          }
          if (this.crashDetails?.airbags?.airbagDriverKnee === 'fired') {
              this.ctx.drawImage(this.imgAirbagKnee, 147, 180);
          }
          if (this.crashDetails?.airbags?.airbagDriverThorax === 'fired') {
              this.ctx.drawImage(this.imgAirbagThoraxDriver, 190, 250);
          }
      }
  }

  drawDeployedPassengerAirgabsGraphics() {
      if (!!this.crashDetails?.vehicle?.leftHandDrive) {
          if (
              this.crashDetails?.airbags?.airbagFrontPassengerFront ===
              'fired'
          ) {
              this.ctx.drawImage(this.imgAirbagPassenger, 144, 200);
          }
          if (
              this.crashDetails?.airbags?.airbagFrontPassengerHead === 'fired'
          ) {
              this.ctx.drawImage(this.imgAirbagHeadPassenger, 180, 170);
          }
          if (
              this.crashDetails?.airbags?.airbagFrontPassengerKnee === 'fired'
          ) {
              this.ctx.drawImage(this.imgAirbagKnee, 147, 180);
          }
          if (
              this.crashDetails?.airbags?.airbagFrontPassengerThorax ===
              'fired'
          ) {
              this.ctx.drawImage(this.imgAirbagThoraxPassenger, 190, 250);
          }
      } else {
          if (
              this.crashDetails?.airbags?.airbagFrontPassengerFront ===
              'fired'
          ) {
              this.ctx.drawImage(this.imgAirbagPassenger, 72, 200);
          }
          if (
              this.crashDetails?.airbags?.airbagFrontPassengerHead === 'fired'
          ) {
              this.ctx.drawImage(this.imgAirbagHeadPassenger, 55, 170);
          }
          if (
              this.crashDetails?.airbags?.airbagFrontPassengerKnee === 'fired'
          ) {
              this.ctx.drawImage(this.imgAirbagKnee, 70, 180);
          }
          if (
              this.crashDetails?.airbags?.airbagFrontPassengerThorax ===
              'fired'
          ) {
              this.ctx.drawImage(this.imgAirbagThoraxPassenger, 54, 250);
          }
      }
  }

  drawDeployedRearAirgabsGraphics() {
      if (!!this.crashDetails?.vehicle?.leftHandDrive) {
          if (this.crashDetails?.airbags?.airbagDriverSideRear === 'fired') {
              this.ctx.drawImage(this.imgAirbagRear, 43, 300);
          }
          if (
              this.crashDetails?.airbags?.airbagPassengerSideRear === 'fired'
          ) {
              this.ctx.drawImage(this.imgAirbagRear, 197, 300);
          }
      } else {
          if (this.crashDetails?.airbags?.airbagDriverSideRear === 'fired') {
              this.ctx.drawImage(this.imgAirbagRear, 197, 300);
          }
          if (
              this.crashDetails?.airbags?.airbagPassengerSideRear === 'fired'
          ) {
              this.ctx.drawImage(this.imgAirbagRear, 43, 300);
          }
      }
  }

  drawVehicleorientationGraphics() {
      if (!!this.crashDetails?.vehicleStatus?.rolloverDetected) {
          this.ctx.drawImage(this.imgRollover, 24, 90);
      }
  }

  drawCollisionsGraphics() {
      let nrFrontCollisions = setCommaSeparatedValuesInArray([
          this.crashDetails?.collisions?.collision1Front,
          this.crashDetails?.collisions?.collision2Front,
          this.crashDetails?.collisions?.collision3Front,
      ]);
      let nrDriverCollisions = setCommaSeparatedValuesInArray([
          this.crashDetails?.collisions?.collision1Driver,
          this.crashDetails?.collisions?.collision2Driver,
          this.crashDetails?.collisions?.collision3Driver,
      ]);
      let nrPassengerCollisions = setCommaSeparatedValuesInArray([
          this.crashDetails?.collisions?.collision1Passenger,
          this.crashDetails?.collisions?.collision2Passenger,
          this.crashDetails?.collisions?.collision3Passenger,
      ]);
      let nrRearCollisions = setCommaSeparatedValuesInArray([
          this.crashDetails?.collisions?.collision1Rear,
          this.crashDetails?.collisions?.collision2Rear,
          this.crashDetails?.collisions?.collision3Rear,
      ]);
      if (nrFrontCollisions != '') {
          this.ctx.drawImage(this.imgHorizontalLine, 55, 20);
          this.ctx.fillText(nrFrontCollisions.toString(), 120-nrFrontCollisions.length*2, 15);
      }
      if (nrRearCollisions != '') {
          this.ctx.drawImage(this.imgHorizontalLine, 55, 475);
          this.ctx.fillText(nrRearCollisions.toString(), 120-nrRearCollisions.length*2, 495);
      }
      if (nrDriverCollisions != '') {
          if (!!this.crashDetails?.vehicle?.leftHandDrive) {
              this.ctx.drawImage(this.imgVerticalLine, 20, 90);
              this.ctx.fillText(nrDriverCollisions.toString(), 0, 250);
          } else {
              this.ctx.drawImage(this.imgVerticalLine, 225, 90);
              this.ctx.fillText(nrDriverCollisions.toString(), 240-nrDriverCollisions.length*5, 250);
          }
      }
      if (nrPassengerCollisions != '') {
          if (!!this.crashDetails?.vehicle?.leftHandDrive) {
              this.ctx.drawImage(this.imgVerticalLine, 225, 90);
              this.ctx.fillText(nrPassengerCollisions.toString(), 240-nrPassengerCollisions.length*5, 250);
          } else {
              this.ctx.drawImage(this.imgVerticalLine, 0, 90);
              this.ctx.fillText(nrPassengerCollisions.toString(), 0, 250);
          }
      }
    }
}
