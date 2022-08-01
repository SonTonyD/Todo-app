import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

type todoTask = {
  name: string;
  isDone: boolean;
  isHidden: boolean;
};

@Component({
  selector: 'app-task-list-card',
  templateUrl: './task-list-card.component.html',
  styleUrls: ['./task-list-card.component.css']
})
export class TaskListCardComponent implements OnInit,OnChanges {

  constructor() { }

  @Input() newTaskName!: string;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['newTaskName'].currentValue)

    if (changes['newTaskName'].currentValue != "" && changes['newTaskName'].firstChange == false) {
      this.todoList.push(
        {
          name: changes['newTaskName'].currentValue,
          isDone: false,
          isHidden: false,
        }
      )
    }
  }

  ngOnInit(): void {
    
  }

  

  todoList: todoTask[] = [
    {
      name: "buy tomatos",
      isDone: false,
      isHidden: false,
    },
    {
      name: "buy ggmeat",
      isDone: false,
      isHidden: false,
    },
    {
      name: "clean the room",
      isDone: false,
      isHidden: false,
    },
    {
      name: "take shower",
      isDone: false,
      isHidden: false,
    },
  ];

  


  validTask(todoTaks: todoTask, event: any) {
    const element = event.target.parentElement;

    if (todoTaks.isDone == false) {
      todoTaks.isDone = true
      element.setAttribute("style", "opacity:0.5; text-decoration: line-through")
    }
    else {
      todoTaks.isDone = false
      element.setAttribute("style", "opacity:1")
    }    
    console.log("The task ", todoTaks.name, " change status: isDone= ", todoTaks.isDone);
  }

  deleteTask(todoTask: todoTask, todoList: todoTask[], event: any) {
    for (let i = 0; i < todoList.length; i++) {
      if (todoTask.name == todoList[i].name) {
        
        todoList.splice(i,1);
        this.delete(event);
      }
    }
  }

  delete(event: any) {
    const element = event.target.parentElement;
    console.log(element);
    element.remove();
  }

  allVisible() {
    for (let i = 0; i < this.todoList.length; i++) {
      this.todoList[i].isHidden = false;
    }
    console.log(this.todoList)
  }

  activeVisible() {
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].isDone == false) {
        this.todoList[i].isHidden = false
      }
      else {
        this.todoList[i].isHidden = true
      }
      
    }
    console.log(this.todoList)
  }

  completedVisible() {
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].isDone == true) {
        this.todoList[i].isHidden = false
      }
      else {
        this.todoList[i].isHidden = true
      }
      
    }
    console.log(this.todoList)
  }

  deleteList: todoTask[] = [
    {
      name: "",
      isDone: false,
      isHidden: false,
    },
  ];

  clearCompleted() {
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].isDone == true) {
        //utilisation de pop
        console.log("tache supprimée", this.todoList[i])
        this.deleteList.push(this.todoList[i])
      }
    }

    for (let i = 0; i < this.todoList.length; i++) {
      for (let j = 0; j < this.deleteList.length; j++) {
        if (this.todoList[i] == this.deleteList[j]) {
          this.todoList.splice(i,1);
        }
      }
    }
  }

 
}
