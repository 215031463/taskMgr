import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

import { User } from '../../domain';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteComponent implements OnInit {
  public members: User[] = [];

  constructor(
    @Inject(MD_DIALOG_DATA) private dialogData,
    private dialogRef: MdDialogRef<InviteComponent>
  ) { }

  ngOnInit() {
    // console.log(JSON.stringify(this.dialogData));
    this.members = [...this.dialogData.members];
  }

  public onSubmit(ev: Event, valid: boolean): void
  {
    ev.preventDefault();
    if (!valid) {
      return;
    }

    this.dialogRef.close(this.members);
  }

}
