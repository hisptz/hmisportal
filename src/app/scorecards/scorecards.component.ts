import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-scorecards',
  templateUrl: './scorecards.component.html',
  styleUrls: ['./scorecards.component.css']
})
export class ScorecardsComponent implements OnInit {
  linkValue = 'RMNCAH';
  heading = 'RMNCAH';
  constructor() { }

  ngOnInit() {
  }

  activateLink(event, type) {
    this.heading = event.target.innerText;
    this.linkValue = type;
  }
}
