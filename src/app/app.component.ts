import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo-app';
  isNight = false;

  newTaskName!: string;
  color !: string;
  backgroundImage !: string;

  onSubmit(event: any) {
    console.log("Input value received: ",event);
    this.newTaskName = event;
  }

  ngAfterViewInit() {
    this.color = "#fafafa";
    this.backgroundImage = 'url("/assets/bg-desktop-light.jpg")';
  }

  toggleNightMode() {
    if (this.isNight == true) {
      console.log("Night mod OFF")
      this.isNight = false;
      this.color = "#fafafa"
      this.backgroundImage = 'url("/assets/bg-desktop-light.jpg")';
    }
    else {
      console.log("Night mod ON")
      this.isNight = true;
      this.color = "hsl(235, 21%, 11%)"
      this.backgroundImage = 'url("/assets/bg-desktop-dark.jpg")';
    }
  }


}
