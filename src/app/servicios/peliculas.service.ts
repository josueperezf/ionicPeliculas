import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { environment } from '../../environments/environment';
import { PeliculaDetalle, RespuestaPDB, RespuestaCreditos, Genero } from '../interfaces/interfaces';

const URL = environment.url;
const APIKEY = environment.apiKey;
@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private popularesPage = 0;
  generos: Genero[] = [];
  constructor(private httpClient:HttpClient ) { }
  private ejecutarQuery<T>(query: string = '') {
    query = URL + query;
    query+= `&api_key=${APIKEY}&language=es&include_image_language=es`;
    return this.httpClient.get<T>(query);
  }
  getCartelera() {
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getUTCFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;
    let mesString;
    if (mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }
    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;
    return this.ejecutarQuery<RespuestaPDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }
  getPopulares() {
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaPDB>(query);
  }

  getPeliculaDetalle(id: string) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getActoresPelicula(id: string) {
    return this.ejecutarQuery<RespuestaCreditos>(`/movie/${id}/credits?a=1`);
  }
  buscarPeliculas(texto: string) {

    return this.ejecutarQuery<RespuestaCreditos>(`/search/movie?query=${texto}`);
  }
  cargarGenero(): Promise<Genero[]>{
    return new Promise(resolve =>{
      this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe((resp)=>{
        this.generos = resp['genres'];
        resolve(this.generos);
      });
    });
  }
}
