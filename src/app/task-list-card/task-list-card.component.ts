import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoAppService } from '../todo-app.service';


export type todoTask = {
  task_id : number;
  name: string;
  isDone: string;
  isHidden: string;
};

@Component({
  selector: 'app-task-list-card',
  templateUrl: './task-list-card.component.html',
  styleUrls: ['./task-list-card.component.css']
})
export class TaskListCardComponent implements OnInit,OnChanges {

  constructor(
    private _todoService : TodoAppService,
  ) { }

  @Input() newTaskName!: string;
  @Input() isNight!: boolean;

  color!: string;
  fontColor!: string;
  fontColorGrey!: string;

  fontColorGreyAll!: string;
  fontColorGreyActive!: string;
  fontColorGreyCompleted!: string;

  filterColor : string[] = [this.fontColorGreyAll, this.fontColorGreyActive, this.fontColorGreyCompleted]

  todoList$!: Observable<todoTask[]>;

  ngAfterViewInit() {
    this.color = "white";
    this.fontColor = "black";
    this.todoList$ = this._todoService.getTodoListElement();

    this._todoService.getTodoListElement().subscribe(
      (res) => {this.todoList = res; console.log("Received from server: ",res)}
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)

    if (changes['newTaskName'] != undefined) {
      if (changes['newTaskName'].currentValue != "" && changes['newTaskName'].firstChange == false) {
      this.todoList.push(
        { 
          task_id : 0,
          name: changes['newTaskName'].currentValue,
          isDone: "0",
          isHidden: "0",
        }
      )
    }
    }

    
    if (changes['isNight'] != undefined) {
      if (changes['isNight'].currentValue) {
        this.color = "hsl(235, 24%, 19%)";
        this.fontColor = "hsl(234, 39%, 85%)";
  
        //check if button isActive, then change the color to active color
        for (let i = 0; i < this.filterButton.length; i++) {
          const element = this.todoList[i];
          if (element) {
            this.filterColor[i] = "red";
          }
          else {
            this.filterColor[i] = "hsl(233, 14%, 35%)"
          }
          
        }
      }
      else {
        this.color = "white";
        this.fontColor = "black";
      }
    }
    
  }



  ngOnInit(): void {
    
  }

  buttonAll!: any;
  buttonActive!: any;
  buttonCompleted!: any;

  buttonAllIsActive !: boolean;
  buttonActiveIsActive !: boolean;
  buttonCompletedIsActive !: boolean;

  filterButton : boolean[] = [this.buttonAllIsActive, this.buttonActiveIsActive, this.buttonCompletedIsActive]


  

  
  //example
  /*
  todoList: todoTask[] = [
    {
      name: "Complete online JavaScript course",
      isDone: false,
      isHidden: false,
    },
    {
      name: "Jog around the park x3",
      isDone: false,
      isHidden: false,
    },
    {
      name: "Read for 1hour",
      isDone: false,
      isHidden: false,
    },
    {
      name: "Pick up groceries",
      isDone: false,
      isHidden: false,
    },
    {
      name: "Complete Todo App on Frontend Mentor",
      isDone: false,
      isHidden: false,
    },
  ];
  */

  //empty todoList
  todoList: todoTask[] = [];
  


  validTask(todoTaks: todoTask, event: any) {
    const element = event.target.parentElement;
    if (todoTaks.isDone == "0") {
      todoTaks.isDone = "1"
      element.setAttribute("style", "opacity:1; text-decoration: line-through")
    }
    else {
      todoTaks.isDone = "0"
      element.setAttribute("style", "opacity:1")
    }
    this._todoService.putEditTodoListElement(todoTaks);    
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

  allVisible(event: any) {
    this.buttonAll = event.target
    event.target.setAttribute("style","text-align: center;border: none;color: blue;background-color: transparent;")
    this.buttonAllIsActive = true
    if (this.buttonActive != null) {
      this.buttonActive.setAttribute("style","text-align: center;border: none;color: rgb(91, 91, 91);background-color: transparent;")
      this.buttonActiveIsActive = false
    }
    if (this.buttonCompleted !=null) {
      this.buttonCompleted.setAttribute("style","text-align: center;border: none;color: rgb(91, 91, 91);background-color: transparent;")
      this.buttonCompletedIsActive = false
    }

    for (let i = 0; i < this.todoList.length; i++) {
      this.todoList[i].isHidden = "0";
    }
    console.log(this.todoList)
  }

  activeVisible(event: any) {
    this.buttonActive = event.target
    event.target.setAttribute("style","text-align: center;border: none;color: blue;background-color: transparent;")
    this.buttonActiveIsActive = true
    if (this.buttonAll != null) {
      this.buttonAll.setAttribute("style","text-align: center;border: none;color: rgb(91, 91, 91);background-color: transparent;")
      this.buttonAllIsActive = true
    }
    if (this.buttonCompleted !=null) {
      this.buttonCompleted.setAttribute("style","text-align: center;border: none;color: rgb(91, 91, 91);background-color: transparent;")
      this.buttonCompletedIsActive = false
    }

    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].isDone == "0") {
        this.todoList[i].isHidden = "0"
      }
      else {
        this.todoList[i].isHidden = "1"
      }
      
    }
    console.log(this.todoList)
  }

  completedVisible(event: any) {
    this.buttonCompleted = event.target
    event.target.setAttribute("style","text-align: center;border: none;color: blue;background-color: transparent;");
    this.buttonCompletedIsActive = true;
    if (this.buttonAll != null) {
      this.buttonAll.setAttribute("style","text-align: center;border: none;color: rgb(91, 91, 91);background-color: transparent;")
      this.buttonAllIsActive = false;
    }
    if (this.buttonActive !=null) {
      this.buttonActive.setAttribute("style","text-align: center;border: none;color: rgb(91, 91, 91);background-color: transparent;")
      this.buttonActiveIsActive = false
    }

    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].isDone == "1") {
        this.todoList[i].isHidden = "0"
      }
      else {
        this.todoList[i].isHidden = "1"
      }
      
    }
    console.log(this.todoList)
  }

  deleteList: todoTask[] = [
    {
      task_id : 0, 
      name: "",
      isDone: "0",
      isHidden: "0",
    },
  ];

  clearCompleted() {
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].isDone == "1") {
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

  onClick() {

  }

 
}
