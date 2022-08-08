import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { todoTask } from './task-list-card/task-list-card.component';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TodoAppService {

  private IP_ADDRESS = "http://localhost:8000";

  ///ROUTES
  private _getTodoListElement = "/api/getTodoListElement";
  private _postTodoListElement = "/api/postTodoListElement";
  private _deleteTodoListElement = "/api/deleteTodoListElement";
  private _putEditTodoListElement = "/api/putEditTodoListElement";
  
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization':`${localStorage.getItem("id")}`,
    })
  }

  getTodoListElement() {
    return this.http.get<todoTask[]>(this.IP_ADDRESS + this._getTodoListElement, this.httpOptions);
  }

  postTodoListElement(element: todoTask) {

  }

  deleteTodoListElement(elements : todoTask[]) {

  }

  putEditTodoListElement( element : todoTask ) {
    console.log("putEditTodoListElement send: ", element)
    return this.http.put(this.IP_ADDRESS + this._getTodoListElement, element ,this.httpOptions);
  }
 





  constructor( private http : HttpClient) { }
}
