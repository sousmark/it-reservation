import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  msg: string;
  constructor(public dialogRef: MatDialogRef<VerifyComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
    if (!this.data) {
      this.dialogRef.close();
      return;
    }

    if (this.data.operation == 'DELETE') {
      this.msg = 'ERROR.DELETE_CONFIRMATION_MESSAGE';
    }

  }

}
