import { Component, OnInit } from '@angular/core';
import { themes } from '../../thems';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'src/app/animations/router-animation';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {
  themes = themes;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  constructor() {}

  ngOnInit() {}
}
