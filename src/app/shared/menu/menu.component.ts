import { Component, OnInit } from '@angular/core';
declare var jquery: any;
declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.navbar-nav li a').click(function(event) {
      if (!$(this).parent().hasClass('dropdown')) {
        $('.navbar-collapse').collapse('hide');
      }
    });
  }

}
