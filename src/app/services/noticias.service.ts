import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';


const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  fecha = new Date();
  

  constructor( private http: HttpClient ) { }

  private ejecutarQuery<T>( query: string){ //al agregar la T la convierto a tipo generico

    query = apiUrl + query;
    
    return this.http.get<T>( query, {headers} );
  }

  getTopHeadLines(){
 
     return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us`);
     //https://newsapi.org/v2/top-headlines?country=us&apiKey=1698b1e051ff45fba817cb7d683c423b
    // return  this.http.get<RespuestaTopHeadlines>(`http://newsapi.org/v2/everything?q=bitcoin&from=${this.fecha}&sortBy=publishedAt&apiKey=1698b1e051ff45fba817cb7d683c423b`);
  }
  getTopHeadlinesCategorias( categoria: string){
    // return  this.http.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1698b1e051ff45fba817cb7d683c423b`);
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${ categoria }`);
  }
}
