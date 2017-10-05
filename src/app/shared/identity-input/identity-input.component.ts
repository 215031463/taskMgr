import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { Identity, IdentityType } from '../../domain';

@Component({
  selector: 'app-identity-input',
  templateUrl: './identity-input.component.html',
  styleUrls: ['./identity-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentityInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  public identityTypes = [
    { label: '身份证', value: IdentityType.IdCard },
    { label: '医保', value: IdentityType.Insurance },
    { label: '护照', value: IdentityType.Passport },
    { label: '军官证', value: IdentityType.Military },
    { label: '其他', value: IdentityType.Other }
  ];

  public identity: Identity = {
    identityType: null,
    identityNo: null
  }

  private sub: Subscription;
  private _idType: Subject<IdentityType> = new Subject();
  private _idNo: Subject<string> = new Subject();

  private propagateChange = (_) => {};

  get idType(): Observable<IdentityType> {
    return this._idType.asObservable();
  }

  get idNo(): Observable<string> {
    return this._idNo.asObservable();
  }

  constructor() { }

  ngOnInit() {
    const val$ = Observable.combineLatest(this.idType, this.idNo, (t, n) => {
      return {
        identityType: t,
        identityNo: n
      };
    });

    this.sub = val$.subscribe((identity: Identity) => {
      this.propagateChange(identity);
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  writeValue(obj: Identity) {
    if (obj) {
      this.identity = obj;
      if (this.identity.identityType) {
        this._idType.next(this.identity.identityType);
      }
      if (this.identity.identityNo) {
        this._idNo.next(this.identity.identityNo);
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

    switch (val.identityType) {
      case IdentityType.IdCard: {
        return this.validateIdCard(c);
      }
      case IdentityType.Passport: {
        return this.validatePassport(c);
      }
      case IdentityType.Military: {
        return this.validateMilitary(c);
      }
      case IdentityType.Insurance:
      default: {
        return null;
      }
    }
  }

  validateIdCard(c: AbstractControl): {[key: string]: any} {
    const val = c.value.identityNo;
    if (val.length !== 18) {
      return {idInvalid: true};
    }
    const pattern = /^[1-9]\d{5}([1-9]\d{3})((0\d)|(1[0-2]))(([0|1|2]\d)|(3[0-1]))\d{3}[x0-9]$/;
    return pattern.test(val) ? null : {idInvalid: true};
  }

  validatePassport(c: AbstractControl): {[key: string]: any} {
    const val = c.value.identityNo;
    if (val.length !== 9) {
      return {idInvalid: true};
    }

    const pattern = /^[GgEe]\d{8}$/;
    return pattern.test(val) ? null : {idInvalid: true};
  }

  validateMilitary(c: AbstractControl): {[key: string]: any} {
    const val = c.value.identityNo;
    const pattern = /^[\u4e00-\u9fa5](字第)(\d{4, 8}(号?))$/;
    return pattern.test(val) ? null : {idInvalid: true};
  }

  public onIdTypeChange(idType: IdentityType): void
  {
    this._idType.next(idType);
  }

  public onIdNoChange(idNo: string): void
  {
    this._idNo.next(idNo);
  }

}
