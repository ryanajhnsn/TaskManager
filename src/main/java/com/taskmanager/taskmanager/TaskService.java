package com.taskmanager.taskmanager;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    public Task createTask (Task task){
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task updateTask){
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setTitle(updateTask.getTitle());
        task.setDescription(updateTask.getDescription());
        task.setStatus(updateTask.getStatus());
        return taskRepository.save(task);
    }

    public void deleteTask(long id){
        taskRepository.deleteById(id);
    }
}
