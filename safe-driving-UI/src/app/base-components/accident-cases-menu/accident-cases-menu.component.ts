import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-accident-cases-menu',
  templateUrl: './accident-cases-menu.component.html',
  styleUrls: ['./accident-cases-menu.component.scss']
})
export class AccidentCasesMenuComponent {
  
  markForDeletion: string = "Trage pinii aici pentru a marca cazurile pentru ștergere";
  preselection:string= "Trage pinii aici pentru a marca cazurile pentru preselecție";
  inProgress:string =  "Trage pinul aici pentru a edita cazul";
  isPreselectionContainerClicked: boolean = false;
  @Output() containerSelectedEmitter = new EventEmitter<string>();
  @Output() preselectionViewEmitter = new EventEmitter<boolean>();
  constructor() { }

  togglePreselectionView() {
    this.isPreselectionContainerClicked =
        !this.isPreselectionContainerClicked;
    this.preselectionViewEmitter.emit(this.isPreselectionContainerClicked);
}

containerEnter(status) {
    if (!!status) {
        this.containerSelectedEmitter.emit(status);
    }
}

containerLeave() {
    this.containerSelectedEmitter.emit('');
}

}
