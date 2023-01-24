import { Component, OnInit } from '@angular/core';
import {map, Observable, startWith, tap} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators, AbstractControl} from "@angular/forms";
import {ComplexFormService} from "../../../core/services/complexForm.service";
import {validValidator} from "../../validators/valid.validator";
import {confirmEqualValidator} from "../../validators/confirm-equal.validator";

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponent implements OnInit {
  // Initialize Form Main attributes
  mainForm!: FormGroup;
  personalInfoForm!: FormGroup;
  contactPreferenceCtrl!: FormControl;
  phoneCtrl!: FormControl;
  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;
  emailForm!: FormGroup;
  usernameCtrl!:FormControl;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  loginInfoForm!: FormGroup;
  //
  loading = false;
  // Initialize observables
  showEmailCtrl$!: Observable<boolean>;
  showPhoneCtrl$!: Observable<boolean>;
  showEmailError$!: Observable<boolean>;
  showPasswordError$!: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private complexFormService: ComplexFormService) { }

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.initFormObservables();
  }

  private initMainForm(): void{
    this.mainForm = this.formBuilder.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceCtrl,
      email: this.emailForm,
      phone: this.phoneCtrl,
      loginInfo: this.loginInfoForm
    });
  }
  private initFormControls(){
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.contactPreferenceCtrl = this.formBuilder.control('email');
    this.phoneCtrl = this.formBuilder.control('');
    this.emailCtrl = this.formBuilder.control('');
    this.confirmEmailCtrl = this.formBuilder.control('');
    this.emailForm = this.formBuilder.group({
      email: this.emailCtrl,
      confirmEmail: this.confirmEmailCtrl
    },{
      validators:[Validators: [confirmEqualValidator('email', 'confirmEmail')],]
    });

    this.passwordCtrl = this.formBuilder.control('',Validators.required);
    this.confirmPasswordCtrl = this.formBuilder.control('',Validators.required);
    this.loginInfoForm = this.formBuilder.group({
      username: this.usernameCtrl,
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    }, {
      validators:[Validators: [confirmEqualValidator('password', 'confirmPassword')]]
    });

  }
  private initFormObservables(){
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === 'email'),
      tap(showEmailCtrl => this.setEmailValidators(showEmailCtrl))
    );
    this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === 'phone'),
      tap(showPhoneCtrl => this.setPhoneValidators(showPhoneCtrl))
    );
    this.showEmailError$ = this.emailForm.statusChanges.pipe(
      map(status => status === 'INVALID')
    );
    this.showPasswordError$ = this.loginInfoForm.pipe(
      map(status => status ==== 'INVALID' && this.passwordCtrl.value && this.confirmPasswordCtrl.value && this.loginInfoForm.hasError('confirmEqual') )
    );
  }
  private setPhoneValidators(showPhoneCtrl:boolean){
    if(showPhoneCtrl){
      this.phoneCtrl.addValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
    }else {
      this.phoneCtrl.clearValidators();
    }
    this.phoneCtrl.updateValueAndValidity();
  }
  private setEmailValidators(showEmailCtrl:boolean){
    if(showEmailCtrl){
      this.emailCtrl.addValidators([Validators.required, Validators.email, validValidator()]);
      this.confirmEmailCtrl.addValidators([Validators.required, Validators.email]);
    }else{
      this.emailCtrl.clearValidators();
      this.confirmEmailCtrl.clearValidators();
    }
    this.emailCtrl.updateValueAndValidity();
    this.confirmEmailCtrl.updateValueAndValidity();

  }
  onSubmitForm() {
    this.loading = true;
    console.log(this.mainForm.value);
    this.complexFormService.saveUserInfo(this.mainForm.value).pipe(
      tap(saved => {
        this.loading = false;
        if(saved){
          console.log('User saved successfully');
          this.resetForm();
        }else{
          console.log('User not saved: error case');
          console.error('Error in saving');
        }
      })
    ).subscribe();
  }
  private resetForm(){
    this.mainForm.reset();
    this.contactPreferenceCtrl.patchValue('email');
  }
  getFormControlErrorText(ctrl:AbstractControl){
    if(ctrl.hasError('required')){
      return 'This field is required';
    }else if(ctrl.hasError('email')){
      return 'Please enter an email valid ';
    }else if(ctrl.hasError('minlength')){
      return 'This Phone number does not contain enough digits';
    }else if(ctrl.hasError('maxlength')){
      return 'This phone number contains too many digits';
    }else if(ctrl.hasError('validValidator')){
      return 'This text does not contain the word VALID';
    }else{
      return 'This field contains an error'
    }
  }
}
