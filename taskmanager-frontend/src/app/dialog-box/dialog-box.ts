import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-dialog-box',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatIconModule, FormsModule, MatSelectModule],
  templateUrl: './dialog-box.html',
  styleUrl: './dialog-box.css',
})
export class DialogBox{
  task = { title:'', description:'', status:''};
  

  constructor(private dialogref: MatDialogRef<DialogBox>){}

  save(){
    this.dialogref.close(this.task);
  }

  close(){
    this.dialogref.close();
  }
}
