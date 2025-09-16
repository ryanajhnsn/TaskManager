import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Task {
  id: number;
  name: string;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule, FormsModule],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTaskName: string = '';
  editingTask: Task | null = null;

  ngOnInit(): void {
    // Optionally initialize with dummy tasks
    this.tasks = [
      { id: 1, name: 'Example Task 1' },
      { id: 2, name: 'Example Task 2' },
    ];
  }

  addTask(): void {
    if (!this.newTaskName.trim()) return;

    const newTask: Task = {
      id: this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1,
      name: this.newTaskName.trim(),
    };

    this.tasks.push(newTask);
    this.newTaskName = '';
  }

  editTask(task: Task): void {
    this.editingTask = { ...task }; // create a copy for editing
  }

  saveTask(): void {
    if (this.editingTask) {
      const index = this.tasks.findIndex(t => t.id === this.editingTask!.id);
      if (index > -1) {
        this.tasks[index] = this.editingTask;
      }
      this.editingTask = null;
    }
  }

  cancelEdit(): void {
    this.editingTask = null;
  }

  deleteTask(task: Task): void {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }
}
