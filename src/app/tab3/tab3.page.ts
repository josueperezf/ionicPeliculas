import { Component, OnInit } from '@angular/core';
import { Genero, PeliculaDetalle } from '../interfaces/interfaces';
import { DataLocalService } from '../servicios/data-local.service';
import { PeliculasService } from '../servicios/peliculas.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  peliculas :PeliculaDetalle[] = [];
  generos :Genero[] =[];
  favoritoPorGeneros : any[] = [];

  constructor(private dataLocalService:DataLocalService,
    private peliculasService: PeliculasService) {}

  ngOnInit() {
    this.dataLocalService.eliminoFavoritoDesdeDetalle.subscribe(()=>{
      console.log('cambio en detalle soy tab 3');
      this.ionViewWillEnter();
    });
  }
  async ionViewWillEnter() {
    this.peliculas =  await this.dataLocalService.cargarFavoritos();
    this.generos = await this.peliculasService.cargarGenero();
    this.peliculasPorGenero(this.generos,this.peliculas);
  }

  peliculasPorGenero(generos:Genero[], peliculas: PeliculaDetalle[]) {
    this.favoritoPorGeneros = [];
    generos.forEach((genero:Genero) => {
      this.favoritoPorGeneros.push({
          genero: genero.name,
          pelis: peliculas.filter((pelicula: PeliculaDetalle) => { return pelicula.genres.find((gen)=>gen.id=== genero.id) } )
        });

    });
    console.log(this.favoritoPorGeneros);

      /*

    */
  }
}
