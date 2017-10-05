import { Component, OnInit, Input, forwardRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

import { UserService } from '../../service/user/user.service';
import { User } from '../../domain';

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true
    }
  ]
})
export class ChipsListComponent implements OnInit, ControlValueAccessor {
  @Input() multiple = true;
  @Input() debounceTime = 300;
  @Input() placeholderText = '请输入成员 email';
  @Input() label = '添加/修改成员';
  public form: FormGroup;
  public choosenItems: User[] = [];
  public memberResults$: Observable<User[]>;

  private propagateChange = (_) => {};

  constructor(private fb: FormBuilder, private us: UserService) { }

  ngOnInit() {
    this.form = this.fb.group({
      memberSearch: []
    });

    this.memberResults$ = this.form.get('memberSearch').valueChanges
      .debounceTime(this.debounceTime)
      .distinctUntilChanged()
      .filter(val => val && val.length > 1)
      .switchMap(keywords => this.us.searchUsers(keywords));
  }

  writeValue(obj: User[]): void {
    if (obj && this.multiple) {
      const userEntities = obj.reduce((e, c) => ({...e, c}), {});
      if (this.choosenItems) {
        const remaining = this.choosenItems.filter(item => !userEntities[item.id]);
        this.choosenItems = [...remaining, ...obj];
      }
    } else if (obj && !this.multiple) {
      this.choosenItems = [...obj];
		}
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  validate(c: AbstractControl): {[key: string]: any} {
    return this.choosenItems ? null : {chipListInvalid: true};
  }

  public get displayInput (): boolean {
    return this.multiple || this.choosenItems.length === 0;
  }

  public removeMember(user: User): void
  {
    const ids = this.choosenItems.map(u => u.id);
    const idx = ids.indexOf(user.id);

    if (idx === -1) { return; }

    this.multiple ? this.choosenItems.splice(idx, 1) : this.choosenItems.length = 0;

    this.form.patchValue({memberSearch: this.choosenItems});
    this.propagateChange(this.choosenItems);
  }

  public selectionChangeHandler(user: User): void
  {
    const ids = this.choosenItems.map(user => user.id);
    const idx = ids.indexOf(user.id);

    if (idx !== -1) { return; }

    this.multiple ? this.choosenItems.push(user) : this.choosenItems.splice(0, 1, user);

    this.form.patchValue({memberSearch: this.choosenItems});
    this.propagateChange(this.choosenItems);
  }

  public displayUser(user: User): string
  {
    return user ? user.name : '';
  }

}
