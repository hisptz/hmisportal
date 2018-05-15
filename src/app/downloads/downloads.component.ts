import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {

  linkValue = 'brn';
  heading = 'Brn';
  constructor() { }

  ngOnInit() {
  }

  activateLink(event, type) {
    this.heading = event.target.innerText;
    this.linkValue = type;
  }
}
