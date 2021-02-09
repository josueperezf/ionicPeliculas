import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {
  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();
  slideOpt = {
    // el siguiente parametros es indicar el numero de imagenes que se mostraran en una cara del slider
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10
  }
  constructor( private modalController:ModalController ) { }

  ngOnInit() {}

  onClick(){
    // console.log('cargar mas');
    this.cargarMas.emit();

  }

  async verDetalle(id) {
    const modal =  await this.modalController.create({
      component: DetalleComponent,
      componentProps:{
        id
      }
    });
    modal.present();
  }

}
