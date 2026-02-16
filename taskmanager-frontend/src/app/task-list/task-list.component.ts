import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task/services/task.service';
import { Task } from '../task/task';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogBox} from '../dialog-box/dialog-box';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatMenuTrigger } from '@angular/material/menu';
import { ViewChild } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';



@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule, FormsModule, MatButtonModule,MatIconModule, MatTooltipModule, MatMenuModule, MatGridListModule,MatSelectModule,MatInputModule,MatFormFieldModule],
  encapsulation: ViewEncapsulation.None
})

export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  newTaskStatus: string = '';
  editingTask: Task | null = null;
  contextMenuPosition = { x: '0px', y: '0px'};
  selectedTask: Task | null = null;

  
  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;

  constructor(private dialog: MatDialog, private taskService: TaskService){}

  openAddTaskDialogBox(){
    const dialogref = this.dialog.open(DialogBox);

    dialogref.afterClosed().subscribe(result => {
      if(result){
        this.taskService.addTask(result).subscribe(() => this.loadTasks());
      }
    })
  }

  


  ngOnInit(): void {
    // Optionally initialize with dummy tasks
    this.loadTasks();
  }

  loadTasks(): void{
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }
  addTask(): void {
    if (!this.newTaskTitle.trim()) return;

    const newTask: Task = {title: this.newTaskTitle, description: this.newTaskDescription, status: "TODO"};
    this.taskService.addTask(newTask).subscribe(task => {
      this.tasks.push(task);
      this.newTaskTitle = '';
      this.newTaskDescription = '';
    });
  }

  editTask(task: Task): void {
    this.editingTask = { ...task }; // create a copy for editing
  }

  saveTask(): void {
    if (this.editingTask) {
      this.taskService.updateTask(this.editingTask).subscribe(updatedTask => {
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        if (index > -1) {
          this.tasks[index] = updatedTask;
        }
        this.editingTask = null;
      });
    }
  }


  cancelEdit(): void {
    this.editingTask = null;
  }

  deleteTask(task: Task): void {
   this.taskService.deleteTask(task.id!).subscribe({
    next: () => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
      this.loadTasks();
    },
    error: err => console.error('Error deleting task:', err)
  });
  }
  
  onRightClick(event: MouseEvent, task: Task, menuTrigger: any){
    
    event.preventDefault();
    
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.selectedTask = task;
    menuTrigger.openMenu();
    

    setTimeout(() => {
      (document.activeElement as HTMLElement)?.blur();
    }, 0);
  }

  updateStatus(task: Task, newStatus: Task['status']): void{
    const updatedTask: Task = {
      ...task,
      status: newStatus
    };

    this.taskService.updateTask(updatedTask).subscribe({
      next: (savedTask) => {
        const index = this.tasks.findIndex(t => t.id === savedTask.id);
        if (index > -1) {
          this.tasks[index] = savedTask;
        }
      },
      error: (err) => {
        console.error('Failed to update status',err);
      }
    });
  }
}
