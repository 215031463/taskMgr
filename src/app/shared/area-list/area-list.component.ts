import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS
} from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';

import { getProvinces, getCitiesByProvince, getDistrictsByCity } from '../../utils/area.utils';
import { Address } from '../../domain';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaListComponent implements OnInit, OnDestroy, ControlValueAccessor {
  public _address: Address = {
    province: '',
    city: '',
    district: '',
    street: ''
  };

  public provinces$: Observable<string[]>;
  public cities$: Observable<string[]>;
  public districts$: Observable<string[]>;

  private sub: Subscription;
  private _province: Subject<string> = new Subject();
  private _city: Subject<string> = new Subject();
  private _district: Subject<string> = new Subject();
  private _street: Subject<string> = new Subject();
  private propagateChange = (_) => {};

  constructor() { }

  ngOnInit() {
    const province$ = this._province.asObservable().startWith('');
    const city$ = this._city.asObservable().startWith('');
    const district$ = this._district.asObservable().startWith('');
    const street$ = this._street.asObservable().startWith('').debounceTime(300);

    const val$ = Observable
      .combineLatest([province$, city$, district$, street$], (p, c, d, s) => {
        return {
          province: p,
          city: c,
          district: d,
          street: s
        };
      });

    this.sub = val$.subscribe(val => {
      this.propagateChange(val);
    });

    this.provinces$ = Observable.of(getProvinces());
    this.cities$ = province$.map(p => getCitiesByProvince(p));
    this.districts$ = Observable.combineLatest(province$, city$, (p, c) => getDistrictsByCity(p, c));

  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  writeValue(obj: Address) {
    if (obj) {
      this._address = obj;
      if (this._address.province) {
        this._province.next(this._address.province);
      }
      if (this._address.city) {
        this._city.next(this._address.city);
      }
      if (this._address.district) {
        this._district.next(this._address.district);
      }
    }
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
  }

  validate(c: AbstractControl): {[key: string]: any} {
    const val = c.value;
    if (!val) {
      return null;
    }

    if (val.province && val.city && val.district && val.street) {
      return null;
    }

    return {addressInvalid: true};
  }

  public onProvinceChange(): void
  {
    this._province.next(this._address.province);
  }

  public onCityChange(): void
  {
    this._city.next(this._address.city);
  }

  public onDistrictChange(): void
  {
    this._district.next(this._address.district);
  }

  public onStreetChange(): void
  {
    this._street.next(this._address.street);
  }
}
