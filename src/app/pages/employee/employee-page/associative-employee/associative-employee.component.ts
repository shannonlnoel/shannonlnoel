import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-associative-employee',
  templateUrl: './associative-employee.component.html',
  styleUrls: ['./associative-employee.component.scss'],
})
export class AssociativeEmployeeComponent implements OnInit {

  @Input() employee : any;

  constructor(public global : GlobalService) { }

  ngOnInit() {}

}
