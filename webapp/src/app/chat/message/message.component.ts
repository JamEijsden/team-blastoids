import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() name;
  @Input() message;
  @Input() color;
  @Input() isClient = false;
  @Input() textColor;

  private viewReady = false;
  messageCss = "sender";

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.messageCss = this.isClient ? 'sender' : 'recipient';
    this.viewReady = true
  }




}
