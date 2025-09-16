import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- add this

@Component({
  selector: 'app-task-form',
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
  imports: [CommonModule]
})
export class TaskFormComponent {

}
