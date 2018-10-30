import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HelpComponent } from '../pages/help/help.component';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../animations/router-animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  showMenu = false;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.showMenu = true;
  }

  openHelpSection() {
    const dialogRef = this.dialog.open(HelpComponent, {
      width: '65%',
      disableClose: true,
      data: { object: '' }
    });
  }
}
