import { Component, OnInit } from '@angular/core';
import { Pelicula, RespuestaPDB } from '../interfaces/interfaces';
import { PeliculasService } from '../servicios/peliculas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];
  constructor(private peliculasService:PeliculasService) {}
  ngOnInit() {
    this.peliculasService.getCartelera().subscribe((respuesta:RespuestaPDB) => {
      this.peliculasRecientes = respuesta.results;
      console.log(this.peliculasRecientes);
    });
    this.getPopulares();
  }

  getPopulares() {
    this.peliculasService.getPopulares().subscribe((respuesta)=>{
      // console.log('populares', respuesta);
      // this.populares = respuesta.results;
      // colocamos esto para que en vez de borrar lo que tenga la variable populares, agregue mas populares al arreglo
      // los tres puntos es para que en vez de guardar todo el arreglo de resultado, inserte fila por fila de respuesta de manera independiente

      // como en slideshow-pares se usa un pipe llamado pares, este no detecta que cambio el valor de la variable asincronamente con el push, asi que crearemos una variable auxiliar que nos ayude a ello
      // la siguiente linea, en pocas palabras los esta concatenando
      let arrTemporal = [...this.populares,  ... respuesta.results];
      this.populares = arrTemporal;
    });
  }
  cargarMas(){
    // console.log('cargar maaas tab1');
    this.getPopulares();
  }
}
