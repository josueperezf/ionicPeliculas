import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../componentes/detalle/detalle.component';
import { Pelicula } from '../interfaces/interfaces';
import { PeliculasService } from '../servicios/peliculas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  textoBuscar = '';
  peliculas : Pelicula[] = [];
  ideas: string[] = [
    'Spiderman',
    'Avenger',
    'El señor de los anillos',
    'La vida es bella'
  ];
  cargando: boolean = false;
  constructor(private peliculasService:PeliculasService, private modalController: ModalController ) {}

  buscar(e) {
    const valor = e.detail.value.trim();
    if(valor) {
      this.cargando = true;
      this.peliculasService.buscarPeliculas(valor).subscribe((resp)=>{
        this.peliculas = resp['results'];
        this.cargando = false;
      });
    } else{
      this.peliculas = [];
    }
  }
  async verDetalle(id:number) {
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }
}
