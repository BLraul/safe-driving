import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-test-car-page-header',
  templateUrl: './test-car-page-header.component.html',
  styleUrls: ['./test-car-page-header.component.scss']
})
export class TestCarPageHeaderComponent {
@Input()
changeStateToTheSidebar: any;




}
