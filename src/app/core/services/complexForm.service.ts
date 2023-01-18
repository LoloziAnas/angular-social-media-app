import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ComplexFormValue} from "../models/complex-form-value.model";
import {environment} from "../../../environments/environment";
import {catchError, delay, map, of} from "rxjs";

@Injectable()
export class ComplexFormService{
  constructor(private http:HttpClient) {

  }
  saveUserInfo(formValue: ComplexFormValue){
    return this.http.post(`${environment.apiUrl}/users`,formValue).pipe(
      map(()=>true),
      delay(1000),
      catchError(()=>of(false).pipe(delay(1000)))
    );
  }
}
