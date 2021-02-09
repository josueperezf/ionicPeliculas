import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Actor, Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/servicios/data-local.service';
import { PeliculasService } from 'src/app/servicios/peliculas.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id;
  pelicula: PeliculaDetalle;
  cantidadFinDeCaracteres = 150;
  actores: Cast[] = [];
  estrella = 'star-outline';
  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5
  };
  constructor( private peliculasService: PeliculasService,
    private modalController :ModalController,
    private dataLocalService:DataLocalService
    ) { }

  ngOnInit() {
    // la siguiente linea es apra ver si el articulo esta en favoritos o no

    this.dataLocalService.existePelicula(this.id).then((existe)=>{
      this.estrella = (existe) ? 'star' : 'star-outline';
      console.log(this.estrella);

    });

    this.peliculasService.getPeliculaDetalle(this.id).subscribe((respuesta)=>{
      this.pelicula = respuesta;
      console.log(respuesta);
    });

    this.peliculasService.getActoresPelicula(this.id).subscribe((respuesta)=>{
      console.log(respuesta);
      this.actores = respuesta.cast;
    });
  }

  regresar() {
    this.modalController.dismiss();
  }
  favorito() {
    const existe = this.dataLocalService.guardarPelicula(this.pelicula);
    if(!existe) {
      // esto lo coloque por si el usuario esta en el tab de favoritos y al levantar el modal de detalle de la pelicula decide quitar de favorito, el tab3 esta subscrito al evento para eliminar de favoritos
      this.dataLocalService.OnEliminoFavoritoDesdeDetalle();
    }
    this.estrella = (existe) ? 'star' : 'star-outline';
  }
}
