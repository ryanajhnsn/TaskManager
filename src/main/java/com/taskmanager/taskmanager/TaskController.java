package com.taskmanager.taskmanager;

import java.util.List;

import org.springframework.web.bind.annotation.*;



@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/tasks")
public class TaskController {
    
    private final TaskService taskService;

    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getTasks(){
        return taskService.getAllTasks();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task){
        return taskService.createTask(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task){
        return taskService.updateTask(id, task);
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id){
        taskService.deleteTask(id);
        return "Task Deleted";
    }
    

    
}
