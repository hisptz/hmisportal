import { Component, OnInit } from '@angular/core';
import {templateJitUrl} from '@angular/compiler';
import {HttpClientService} from '../services/http-client.service';
declare var jquery: any;
declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: any = {
    email: '',
    subject: '',
    message: '',
    phone: ''
  };
  userGroupID = 'TzdTxMEbt1W';
  showLoading = false;
  showError = false;
  constructor(private http: HttpClientService) { }

  ngOnInit() {
    $('.navbar-nav li a').click(function(event) {
      if (!$(this).parent().hasClass('dropdown')) {
        $('.navbar-collapse').collapse('hide');
      }
    });
  }

  saveComment() {
    // $('#exampleModal').modal('hide');
    this.showLoading = true;
    const userGroups = [];
    const messageUrl = 'messageConversations';
    const dataTextToSend = {
      'subject': this.user.subject,
      'text': this.user.message + ' Contacts Details: Email ' + this.user.email + ' and Phone number ' + this.user.phone,
      'userGroups': [
      {
        'id': 'omE6KyV9BjC'
      }
    ]
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    $.post('https://hmisportal.moh.go.tz/dhis/dhis-web-commons-security/login.action?authOnly=true', {
      j_username: 'portal', j_password: 'Portal123'
    }, () => {
      $.ajax({
        method: 'POST',
        url: 'https://hmisportal.moh.go.tz/dhis/' + messageUrl,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(dataTextToSend),
        success: (msg) => {
          this.showLoading = false;
        }
      });
    });
  }

  disableds(): boolean {
    let checker = false;
    if (this.user.email === '' || this.user.subject === '' || this.user.message === '') {
      checker = true;
    }
    return checker;
  }


}
