import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  loading: boolean;
  constructor(
    public dialogRef: MatDialogRef<HelpComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {}
  onClose(show = false) {
    if (show) {
      this.snackBar.open('Your feedback was well received', 'Ok', {
        duration: 2500,
        panelClass: 'success'
      });
    }
    this.dialogRef.close();
  }
}
