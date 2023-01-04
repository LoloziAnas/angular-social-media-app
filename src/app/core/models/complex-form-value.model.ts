export class ComplexFormValue{
  personalInfo!:{
    firstName: string,
    lastName: string,
  };
  contactPreference!: string;
  email?:{
    email: string,
    confirm: string
  };
  phone?: string;
  loginInfo!:{
    username: string,
    password: string,
    confirmedPassword: string
  }
}
