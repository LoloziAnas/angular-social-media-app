import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  exports: [HeaderComponent]
})
export class CoreModule { }
/*
* import {Comment} from "./comment.model";

export class Post{
  id!: number;
  userId!: number;
  title!: string;
  createdDate!: string;
  imageUrl!: string;
  content!: string;
  comments!: Comment[];
}
* */

/*
* export class ComplexFormValue{
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
}*/
/*import {Comment} from "./comment.model";

export class Post{
  id!: number;
  userId!: number;
  title!: string;
  createdDate!: string;
  imageUrl!: string;
  content!: string;
  comments!: Comment[];
}*/
