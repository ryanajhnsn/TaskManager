import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task/services/task.service';
import { Task } from '../task/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskListComponent implements OnInit{
  tasks: Task [] = [];
  newTaskName: string = '';
  editingTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(){
      this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => this.tasks = data,
      error: (err) => console.error('Error fetching tasks', err)
    });
  }

  addTask(): void{
    if(!this.newTaskName.trim()) return;
    const task: Task = {id: 0, name: this.newTaskName}
    this.taskService.addTask(task).subscribe({
      next: (t) => {
        this.tasks.push(t);
        this.newTaskName = '';
      },
      error: (err) => console.error('Error adding task',err)
    });
  }

  deleteTask(task: Task): void{
    this.taskService.deleteTask(task.id!).subscribe({
      next: () => this.tasks = this.tasks.filter(t => t.id !== task.id),
      error: (err) => console.error('Error deleting task', err)
    });
  }

  startEditing(task: Task): void{
    this.editingTask = {...task}; //makes it so that dont instantly reflect in the list.
  }

  updateTask(): void{
    if(!this.editingTask) return;
    this.taskService.updateTask(this.editingTask).subscribe({
      next: (updated) => {
        const index = this.tasks.findIndex(t => t.id === updated.id);
        if (index >= 0){
          this.tasks[index] = updated;
        }
        this.editingTask = null;
      },
      error: (err) => console.error('Error updating task', err)
    });
  }



}
