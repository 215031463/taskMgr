import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteComponent implements OnInit {
  public memembers = [
    {
      id: 1000,
      name: 'Jerry'
    },
    {
      id: 1001,
      name: 'Army'
    },
    {
      id: 1003,
      name: '张帆'
    }
  ];

  public selectedMemember: { id: number; name: string; };

  constructor(
    @Inject(MD_DIALOG_DATA) private dialogData,
    private dialogRef: MdDialogRef<InviteComponent>
  ) { }

  ngOnInit() {
    // console.log(JSON.stringify(this.dialogData));
  }

  public displayUser(user: { id: number; name: string; }): string
  {
    return user.name ? user.name : '';
  }

  public saveClick(): void
  {
    this.dialogRef.close({ selectedMemember: this.selectedMemember });
  }

  public select(id: number | string): void
  {
    this.selectedMemember = this.memembers.find(memember => memember.id === +id);
  }

}
