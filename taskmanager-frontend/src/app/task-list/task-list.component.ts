import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task/services/task.service';
import { Task } from '../task/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule, FormsModule],
})

export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  editingTask: Task | null = null;

  constructor(private taskService: TaskService){}

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
  this.taskService.deleteTask(task.id!).subscribe(() => {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  });
  }

}
