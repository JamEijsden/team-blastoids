import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-view-template',
  templateUrl: './view-template.component.html',
  styleUrls: ['./view-template.component.scss']
})
export class ViewTemplateComponent implements OnInit {

  @Input() viewReady = false;

  constructor() { }

  ngOnInit() {
  }

}
