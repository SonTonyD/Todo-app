import { Component, EventEmitter, OnInit, Output, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-input-card',
  templateUrl: './input-card.component.html',
  styleUrls: ['./input-card.component.css']
})
export class InputCardComponent implements OnInit, OnChanges {

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isNight'] != undefined) {
      if (changes['isNight'].currentValue) {
        this.color = "hsl(235, 24%, 19%)";
        this.fontColor = "hsl(234, 39%, 85%)"
      } 
      else {
        this.color = "white";
        this.fontColor = "black"
      }
    }
    
    
  }

  color!: string;
  fontColor!: string;

  ngAfterViewInit() {
    this.color = "white"
    this.fontColor = "black"
  }

  taskName!: string;
  @Output() taskNameOutput = new EventEmitter<string>();
  @Input() isNight!: boolean;


  

  onSubmit() {
    this.taskNameOutput.emit(this.taskName);
    this.taskName = "";
  }

}
