import { Component, OnInit, OnDestroy, Input, forwardRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  AbstractControl,
  ValidatorFn,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS
} from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/take';

import {
  subDays,
  subMonths,
  subYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  isBefore,
  parse,
  format
} from 'date-fns';
import { dateValidate } from '../../utils/date.utils';

export const enum AgeUnit {
  Year,
  Month,
  Day
}

export interface Age {
  age: number;
  unit: AgeUnit;
}

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    }
  ]
})
export class AgeInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() daysBottom = 1;
  @Input() daysTop = 90;
  @Input() monthsBottom = 1;
  @Input() monthsTop = 24;
  @Input() yearsBottom = 0;
  @Input() yearsTop = 150;
  @Input() debounceTime = 500;
  @Input() format = 'YYYY-MM-DD';
  public form: FormGroup;
  public units = [
    { value: AgeUnit.Year, label: '岁' },
    { value: AgeUnit.Month, label: '月' },
    { value: AgeUnit.Day, label: '天' }
  ];

  private sub: Subscription;

  private propagateChange =  (_: any) => {};

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  writeValue(obj: any): void {
    if (obj) {
      const date = new Date(obj);
      const age = this.toAge(date);
      this.form.get('birthday').patchValue(date);
      // 手动写 年龄值， 此时不会触发 valueChanges
      this.form.get(['age', 'ageNum']).patchValue(age.age);
      this.form.get(['age', 'ageUnit']).patchValue(age.unit);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  private buildForm(): void
  {
    this.form = this.fb.group({
      birthday: [null, this.validateDate],
      age: this.fb.group({
        ageNum: [],
        ageUnit: [AgeUnit.Year]
      }, {validator: this.validateAge('ageNum', 'ageUnit')})
    });

    this.valueChange();
  }

  private valueChange(): void
  {
    const birthday = this.form.get('birthday');
    const ageNum = this.form.get(['age', 'ageNum']);
    const ageUnit = this.form.get(['age', 'ageUnit']);

    const birthday$ = birthday.valueChanges
      .map(d => {
        return { date: d, from: 'birthday' };
      })
      .debounceTime(this.debounceTime)
      .distinctUntilChanged()
      .filter(_ => birthday.valid);
    const ageNum$ = ageNum.valueChanges
      // .startWith(ageNum.value)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged();
    const ageUnit$ = ageUnit.valueChanges
      .startWith(ageUnit.value)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged();

    const age$ = Observable
      .combineLatest(ageNum$, ageUnit$, (_n, _u) => {
        return { age: _n, unit: _u };
      })
      .debounceTime(this.debounceTime)
      .map((age: Age) => {
        const d = this.toDate(age);
        return {date: d, from: 'age'};
      })
      .filter(_ => this.form.get('age').valid);
    const merged$ = Observable.merge(birthday$, age$)
      .filter(_ => this.form.valid);

    this.sub = merged$.subscribe(d => {
      const age = this.toAge(d.date);
      if (d.from === 'birthday') {
        if (age.age !== ageNum.value) {
          ageNum.patchValue(age.age, { eventEmitter: false });
        }
        if (age.unit !== ageUnit.value) {
          ageUnit.patchValue(age.unit, { eventEmitter: false });
        }
        this.propagateChange(d);
      } else {
        const birthAgeCompare = this.toAge(birthday.value);
        if (birthAgeCompare.age !== age.age || birthAgeCompare.unit !== age.unit) {
          birthday.patchValue(new Date(d.date), { eventEmitter: false });
        }
      }
    });
  }

  private toDate(age: Age): string
  {
    if (!age.age) {
      return null;
    }
    const now = Date.now();
    switch (age.unit) {
      case AgeUnit.Year: {
        return format(subYears(now, age.age), this.format);
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), this.format);
      }
      case AgeUnit.Day: {
        return format(subDays(now, age.age), this.format);
      }
      default: {
        return null;
      }
    }
  }

  private toAge(date: Date | string): Age
  {
    const now = Date.now();
    date = parse(date);
    return isBefore(subDays(now, this.daysTop), date) ? {age: differenceInDays(now, date), unit: AgeUnit.Day} :
      isBefore(subMonths(now, this.monthsTop), date) ? {age: differenceInMonths(now, date), unit: AgeUnit.Month} :
        {age: differenceInYears(now, date), unit: AgeUnit.Year};
  }

  validate(c: AbstractControl): {[key: string]: any} {
    if (!c.value) {
      return null;
    }
    if (dateValidate(c.value)) {
      return null;
    }
    return {dateOfBirth: true};
  }

  validateDate(c: AbstractControl): {[key: string]: any} {
    return dateValidate(c.value) ? null : {dateInvalid: true};
  }

  validateAge(ageNumKey: string, ageUnitKey: string): ValidatorFn {
    return (g: FormGroup): {[key: string]: any} => {
      const ageNum = g.get(ageNumKey).value;
      const ageUnit = g.get(ageUnitKey).value;
      const now = Date.now();
      if (ageNum === null) {
        return {ageInvalid: true};
      }
      switch (ageUnit) {
        case AgeUnit.Day: {
          return ageNum >= this.daysBottom && ageNum < this.daysTop ? null : { ageInvalid: true };
        }
        case AgeUnit.Month: {
          return ageNum >= this.monthsBottom && ageNum < this.monthsTop ? null : { ageInvalid: true };
        }
        case AgeUnit.Year: {
          return ageNum >= this.yearsBottom &&  ageNum < this.yearsTop ? null : { ageInvalid: true };
        }
        default: {
          return { ageInvalid: true };
        }
      }
    };
  }

}
