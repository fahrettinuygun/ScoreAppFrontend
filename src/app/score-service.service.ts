import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {RequestModel} from '../models/request-model'
import {ResponseModel} from '../models/response-model'

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  apiUrl = "http://localhost:8000/score"

  constructor(
    private http: HttpClient
    ) { }

   calculateScore (name:string,surname:string,id:number,phone:string,city:number,income:number){
    try {
      return this.http.get<ResponseModel>(this.apiUrl,
        {params:{
          name:name, 
          surname:surname, 
          phone:phone,
          city:city.toString(),
          income:income.toString(),
          id:id.toString()
        }
        });
    } catch (error) {
      alert("Bağlantıda bir sorun oluştu. Lütfen daha sonra tekrar deneyiniz.")
      console.error(error);
    }
  }
}
