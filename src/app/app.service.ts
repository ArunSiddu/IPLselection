import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
//import { App } from "./myapps.model";
 
@Injectable()
export class AppService {
   constructor(private http: HttpClient) {}
 
   get(url: string): Observable<any> {
      return this.http
        .get(url)
        .map(res => {
          return res;
        })
        .catch(error => this.handleError(error));
    }

  // Error handling
  protected handleError(error: any) {
      return Observable.throw(error);
    }

}
