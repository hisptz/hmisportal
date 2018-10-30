import { Component, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../animations/router-animation';

@Component({
  selector: 'app-rch',
  templateUrl: './rch.component.html',
  styleUrls: ['./rch.component.scss']
})
export class RchComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  menus = [
    {
      title: 'Reproductive health',
      fact: 'Deliveries',
      description:
        'From 2016 to 2017, institutional deliveries has increased from 64.5% to 69.5%.'
    },
    {
      title: 'Antenatal Care',
      fact: '95.3 %',
      description: 'of pregnant women were tested for HIV at ANC in 2017'
    },
    {
      title: 'Antenatal Care',
      fact: '0.93 %',
      description: 'is the anaemia prevalance rate in  year 2017'
    },
    {
      title: 'Child health',
      fact: '99.7%',
      description: 'is the BCG Vaccines Coverage in Tanzania in 2017'
    }
  ];
  constructor() {}

  ngOnInit() {}
}
