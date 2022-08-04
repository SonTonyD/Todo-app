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
    console.log(changes['isNight'].currentValue)
    if (changes['isNight'].currentValue) {
      this.color = "hsl(235, 24%, 19%)";
    } 
    else {
      this.color = "white";
    }
    
  }

  color!: string;

  ngAfterViewInit() {
    this.color = "white"
  }

  taskName!: string;
  @Output() taskNameOutput = new EventEmitter<string>();
  @Input() isNight!: boolean;


  

  onSubmit() {
    this.taskNameOutput.emit(this.taskName);
    this.taskName = "";
  }

}
