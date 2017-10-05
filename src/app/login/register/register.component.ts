import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';

import { extraInfo, getAddr, getBirth, IdentityInfo, isValidAddrCode } from '../../utils/identity.utils';
import { dateValidate } from '../../utils/date.utils';
import { Address, Identity, IdentityType } from '../../domain';
import { equalValidate } from '../../validators/equal.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private formSub: Subscription;
  private identitySub: Subscription;
  public items: Array<string>;
  public registerForm: FormGroup;

  // 注册表单 错误提示信息定义
  public formErrors = {
    email: [],
    password: [],
    confirmPassword: [],
    avatar: []
  };

  private validationMessages = {
    email: {
      required: '必须填写邮箱',
      email: '邮箱格式不正确'
    },
    password: {
      required: '必须填写密码',
      minlength: '密码最少6位',
      maxlength: '密码最多12位',
      equalValidate: '两次输入密码不一致'
    },
    confirmPassword: {
      required: '必须填写密码',
      minlength: '密码最少6位',
      maxlength: '密码最多12位',
      equalValidate: '两次输入密码不一致'
    },
    avatar: {
      required: '要选择一个头像'
    },
    dateOfBirth: []
  };

  public get passwordLength (): boolean
  {
    return this.formErrors.password.length <= 0
  }

  public get confirmPassword(): boolean
  {
    return this.formErrors.confirmPassword.length <= 0;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // svg图像值 处理
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    this.items = arr.map(d => `avatars:svg-${d}`);

    this.buildForm();
  }

  ngOnDestroy() {
    if (this.formSub) {
      this.formSub.unsubscribe();
    }
    if (this.identitySub) {
      this.identitySub.unsubscribe();
    }
  }

  private buildForm(): void
  {
    // 随机头像处理
    let avatarNum = Math.floor(Math.random() * 16) + 1;
    let avatar = `avatars:svg-${avatarNum}`;
    // 创建响应式表单数据模型
    this.registerForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      name: [''],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])],
      confirmPassword: ['', Validators.compose([
        equalValidate('password')
      ])],
      avatar: avatar,
      dateOfBirth: [],
      identity: [],
      address: []
    });

    // 订阅registerForm的 valueChanges
    this.formSub = this.registerForm.valueChanges.subscribe(() => {
      this.onValueChanges();
    });

    // 个人信息  输入身份证 联动 出生日期年龄控件 和 地址控件
    const identity = this.registerForm.get('identity');
    const identity$ =
    identity.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .filter(_ => identity.valid);

    this.identitySub = identity$
      .subscribe((i: Identity) => {
        if (i.identityType !== IdentityType.IdCard) {
          return;
        }

        const identityInfo: IdentityInfo = extraInfo(i.identityNo);
        const addrCode: string = identityInfo ? identityInfo.addrCode : '';
        const birthCode: string = identityInfo ? identityInfo.birthCode : '';
        const birthVal: string = getBirth(birthCode);

        if (isValidAddrCode(addrCode)) {
          const addrVal: Address = getAddr(addrCode);
          this.registerForm.get('address').patchValue(addrVal, {eventEmitter: false});
        }
        if (dateValidate(new Date(birthVal))) {
          this.registerForm.get('dateOfBirth').patchValue(new Date(birthVal), {eventEmitter: false});
        }
      });
  }

  public onValueChanges(): void
  {
    let form = this.registerForm;
    for (let field in this.formErrors) {
      this.formErrors[field].splice(0);
      let control = form.get(field);
      let messages = this.validationMessages[field];
      if (control && control.dirty && control.invalid) {
        for (let key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
  }

  public doRegister({ value, valid }): void
  {
    console.log(value);
  }

}
