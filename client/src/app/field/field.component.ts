import {Component, Input, OnInit} from '@angular/core';
import {Field} from "../engine/field";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() field: Field= new Field({x:0,y:0});
  constructor() { }

  ngOnInit(): void {
    console.log(this.field.position)
  }

}
