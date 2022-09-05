import { Component, Input, OnInit } from '@angular/core';
import { EmployeeType } from 'src/app/models/employeeType';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-associative-etype',
  templateUrl: './associative-etype.component.html',
  styleUrls: ['./associative-etype.component.scss'],
})
export class AssociativeEtypeComponent implements OnInit {
  @Input() employeeType: EmployeeType;

  constructor(public global: GlobalService) { }

  ngOnInit() {}

}
