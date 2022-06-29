import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  urlEndPoint = environment.ApiSpringURL;

  constructor(private http:HttpClient,private router:Router) { }

  getListPokemons(index:number) : Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/pokemon/${index}`).pipe(
      catchError(e =>{
        if(e.status == 404)
        console.log(e);
          return throwError(()=>e);      
      })
    );
  }
}
