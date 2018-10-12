import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  gameLinks = [
    {value: 'Solo', link: 'play'},
    {value: 'Host', link: 'host'},
    {value: 'Join', link: 'join'},
  ];

  playerName = "GabeTheBork";

  constructor() { }

  ngOnInit() {
  }

}
