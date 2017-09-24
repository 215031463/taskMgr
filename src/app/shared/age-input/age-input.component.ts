import { Component, OnInit, forwardRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  AbstractControl,
  ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {
  subDays,
  subMonths,
  subYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  parse,
  isBefore,
  format
} from 'date-fns';

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
export class AgeInputComponent implements OnInit, ControlValueAccessor {
  public form: FormGroup;
  public ageUnits = [
    { value: AgeUnit.Year, name: '年' },
    { value: AgeUnit.Month, name: '月' },
    { value: AgeUnit.Day, name: '日' }
  ];
  private propagateChange = (_: any) => {};

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void
  {
    this.form = this.fb.group({
      birthday: [],
      age: this.fb.group({
        ageNum: [],
        ageUnit: []
      })
    });

    this.ageControlsTrack();
  }

  private ageControlsTrack(): void
  {
    const birthday = this.form.get('birthday');
    const ageNum = this.form.get(['age', 'ageNum']);
    const ageUnit = this.form.get(['age', 'ageUnit']);

    const birthday$ = birthday.valueChanges
      .startWith(birthday.value)
      .debounceTime(300)
      .distinctUntilChanged()
      .map(date => {
        return { date: date, from: 'birthday' };
      })
      .filter(_ => birthday.valid);
    const ageNum$ = ageNum.valueChanges
      .startWith(ageNum.value)
      .debounceTime(300)
      .distinctUntilChanged();
    const ageUnit$ = ageUnit.valueChanges
      .startWith(ageUnit.value)
      .debounceTime(300)
      .distinctUntilChanged();

    const age$ = Observable.combineLatest(ageNum$, ageUnit$, (_n, _u) => {
      return this.toDate({age: _n, unit: _u});
    })
    .map(date => {
      return { date: date, from: 'age' };
    })
    .filter(_ => this.form.get('age').valid);

    const merged$ = Observable.merge(birthday$, age$).filter(_ => this.form.valid);

    merged$.subscribe(d => {
      console.log('merged$', d);
      const age: Age = this.toAge(d.date);
      if (d.from === 'birthday') {
        console.log('================');
        if (age.age !== ageNum.value) {
          console.log(age.age);
          ageNum.patchValue(age.age, {eventEmitter: false});
        }
        if (age.unit !== ageUnit.value) {
          ageUnit.patchValue(age.unit, {eventEmitter: false});
        }
        this.propagateChange(d.date);
      } else {
        console.log('+++++++++++++++=');
        const birthToCompare: Age = this.toAge(birthday.value);
        if (birthToCompare.age !== age.age || birthToCompare.unit !== age.unit) {
          birthday.patchValue(d.date, {eventEmitter: false});
          this.propagateChange(d.date);
        }
      }
    });
  }

  private toDate(age: Age): string
  {
    const now = Date.now();
    const dateFormat = 'YYYY-MM-DD';
    switch (age.unit) {
      case AgeUnit.Year: {
        return format(subYears(now, age.age), dateFormat);
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), dateFormat);
      }
      case AgeUnit.Day: {
        return format(subDays(now, age.age), dateFormat);
      }
      default: {
        return null;
      }
    }
  }

  private toAge(d: string | Date): Age
  {
    const date = parse(d);
    const now = Date.now();
    return isBefore(subDays(now, 90), date) ?
      {age: differenceInDays(now, date), unit: AgeUnit.Day} :
        isBefore(subMonths(now, 24), date) ?
          {age: differenceInMonths(now, date), unit: AgeUnit.Month} :
            {age: differenceInYears(now, date), unit: AgeUnit.Year}
  }

  validate(c: AbstractControl): {[key: string]: any} {
    return;
  }

  validateDate(c: AbstractControl): {[key: string]: any} {
    return;
  }

  validateAge(ageNumKey: string, ageUnitKey: string): ValidatorFn {
    return (c: AbstractControl): {[key: string]: any} => {
      return;
    };
  }

  writeValue(obj: any): void{

  }

  registerOnChange(fn: any): void{
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void{

  }

}
