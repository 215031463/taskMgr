import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { QuoteService } from '../../service/quote/quote.service';
import { Quote } from '../../domain/quote.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public quote: Quote = {
    'cn': '知识改变命运，英语成就未来！',
    'en': 'Knowlegde can change your fate and English can accomplish your future.',
    'pic': '/assets/img/quotes/3.jpg'
  };

  public formErrors = {
    'email': '',
    'password': ''
  };

  public validationMessages = {
    'email': {
      'required': '邮箱必须填写',
      'email': '邮箱格式不正确'
    },
    'password': {
      'required': '密码必须填写',
      'minlength': '密码长度最少6位',
      'maxlength': '密码长度最长12位'
    }
  };

  constructor(
    private fb: FormBuilder,
    private qs: QuoteService) { }

  ngOnInit() {
    this.loadQuote();
    this.buildForm();
  }

  private buildForm(): void
  {
    // 未使用FormBuilder版本
    // this.loginForm = new FormGroup({
    //   email: new FormControl('215031463@qq.com', Validators.compose([ Validators.required, Validators.email ])),
    //   password: new FormControl('', Validators.required)
    // });

    // 使用FormBuilder版本
    this.loginForm = this.fb.group({
      email: ['chen@sina.com', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])]
    });

    this.loginForm.valueChanges.subscribe(value => this.onValueChanges(value));
  }

  public doLogin({value, valid}): void
  {
    console.log(JSON.stringify(value, undefined, 2));
    console.log(valid);
  }

  public onValueChanges(value: { [key: string]: string }): void
  {
    if (!this.loginForm) {
      return;
    }

    let form = this.loginForm;
    for (let field in this.formErrors) {
      this.formErrors[field] = '';
      let control = form.get(field);
      if (control && control.dirty && control.invalid) {
        let messages = this.validationMessages[field];
        for (let key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  public loadQuote(): void
  {
    this.qs.getQuote()
      .subscribe((q: Quote) => {
        this.quote = q;
      });
  }

}
