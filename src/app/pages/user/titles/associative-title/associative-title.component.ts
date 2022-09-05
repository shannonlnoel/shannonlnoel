import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-associative-title',
  templateUrl: './associative-title.component.html',
  styleUrls: ['./associative-title.component.scss'],
})
export class AssociativeTitleComponent implements OnInit {
  @Input() title: Title;
  constructor(public global: GlobalService) { }

  ngOnInit() {}

}
