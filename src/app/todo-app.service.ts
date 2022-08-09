import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { todoTask } from './task-list-card/task-list-card.component';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TodoAppService {

  //-------------LOCAL-----------------//
  //private IP_ADDRESS = "http://localhost:8000";

  //-------------PROD-----------------//
  private IP_ADDRESS = "https://todo-app-backend-stdinh.herokuapp.com";
  

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
    return this.http.post(this.IP_ADDRESS + this._postTodoListElement, element ,this.httpOptions);
  }

  deleteTodoListElement(element: todoTask) {
    return this.http.post(this.IP_ADDRESS + this._deleteTodoListElement, element, this.httpOptions);

  }

  putEditTodoListElement( element : todoTask ) {
    console.log("putEditTodoListElement send: ", element)
    return this.http.put(this.IP_ADDRESS + this._putEditTodoListElement, element ,this.httpOptions);
  }
 





  constructor( private http : HttpClient) { }
}
