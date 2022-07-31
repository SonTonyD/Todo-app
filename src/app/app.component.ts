import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo-app';

  newTaskName!: string;

  onSubmit(event: any) {
    console.log("Input value received: ",event);
    this.newTaskName = event;
  }
}
