import { Component } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent {
  hide = true;
  
  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<AddNewUserComponent>,  ) { }

    createUser(signUpForm: NgForm){
    this.userService.signUp(signUpForm.value);
    this.dialogRef.close();
  }

}
