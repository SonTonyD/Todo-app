import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-card',
  templateUrl: './input-card.component.html',
  styleUrls: ['./input-card.component.css']
})
export class InputCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  taskName!: string;
  @Output() taskNameOutput = new EventEmitter<string>();

  onSubmit() {
    this.taskNameOutput.emit(this.taskName);
    this.taskName = ""
  }

}
