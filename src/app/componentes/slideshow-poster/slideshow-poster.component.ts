import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {
  @Input() peliculas;
  slideOpt = {
    // el siguiente parametros es indicar el numero de imagenes que se mostraran en una cara del slider
    slidesPerView: 3.3,
    freeMode: true
  }
  constructor( private modalController:ModalController ) { }

  ngOnInit() {}

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
