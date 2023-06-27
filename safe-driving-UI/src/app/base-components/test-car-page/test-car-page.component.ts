import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-test-car-page',
  templateUrl: './test-car-page.component.html',
  styleUrls: ['./test-car-page.component.scss']
})
export class TestCarPageComponent implements OnInit, AfterViewInit{
  @ViewChild('drawer') mySidebar: ElementRef;
  matDrawer: any;

  constructor(private cd:ChangeDetectorRef){}

  ngOnInit(){
    console.log("RentalPageComponent")
  }

  ngAfterViewInit(): void {
      this.matDrawer = this.mySidebar;
      this.cd.detectChanges();
  }

  
}
