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
  @Input() isNight!: boolean;

  color!: string;
  fontColor!: string;
  fontColorGrey!: string;

  fontColorGreyAll!: string;
  fontColorGreyActive!: string;
  fontColorGreyCompleted!: string;

  filterColor : string[] = [this.fontColorGreyAll, this.fontColorGreyActive, this.fontColorGreyCompleted]

  ngAfterViewInit() {
    this.color = "white";
    this.fontColor = "black";
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)

    if (changes['newTaskName'] != undefined) {
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



  ngOnInit(): void {
    
  }

  buttonAll!: any;
  buttonActive!: any;
  buttonCompleted!: any;

  buttonAllIsActive !: boolean;
  buttonActiveIsActive !: boolean;
  buttonCompletedIsActive !: boolean;

  filterButton : boolean[] = [this.buttonAllIsActive, this.buttonActiveIsActive, this.buttonCompletedIsActive]

  

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

  allVisible(event: any) {
    this.buttonAll = event.target
    event.target.setAttribute("style","text-align: center;font-size: 12px;border: none;color: blue;background-color: transparent;")
    this.buttonAllIsActive = true
    if (this.buttonActive != null) {
      this.buttonActive.setAttribute("style","text-align: center;font-size: 12px;border: none;color: rgb(91, 91, 91);background-color: transparent;")
      this.buttonActiveIsActive = false
    }
    if (this.buttonCompleted !=null) {
      this.buttonCompleted.setAttribute("style","text-align: center;font-size: 12px;border: none;color: rgb(91, 91, 91);background-color: transparent;")
      this.buttonCompletedIsActive = false
    }

    for (let i = 0; i < this.todoList.length; i++) {
      this.todoList[i].isHidden = false;
    }
    console.log(this.todoList)
  }

  activeVisible(event: any) {
    this.buttonActive = event.target
    event.target.setAttribute("style","text-align: center;font-size: 12px;border: none;color: blue;background-color: transparent;")
    this.buttonActiveIsActive = true
    if (this.buttonAll != null) {
      this.buttonAll.setAttribute("style","text-align: center;font-size: 12px;border: none;color: rgb(91, 91, 91);background-color: transparent;")
      this.buttonAllIsActive = true
    }
    if (this.buttonCompleted !=null) {
      this.buttonCompleted.setAttribute("style","text-align: center;font-size: 12px;border: none;color: rgb(91, 91, 91);background-color: transparent;")
      this.buttonCompletedIsActive = false
    }

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

  completedVisible(event: any) {
    this.buttonCompleted = event.target
    event.target.setAttribute("style","text-align: center;font-size: 12px;border: none;color: blue;background-color: transparent;");
    this.buttonCompletedIsActive = true;
    if (this.buttonAll != null) {
      this.buttonAll.setAttribute("style","text-align: center;font-size: 12px;border: none;color: rgb(91, 91, 91);background-color: transparent;")
      this.buttonAllIsActive = false;
    }
    if (this.buttonActive !=null) {
      this.buttonActive.setAttribute("style","text-align: center;font-size: 12px;border: none;color: rgb(91, 91, 91);background-color: transparent;")
      this.buttonActiveIsActive = false
    }

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
