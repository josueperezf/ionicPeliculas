import { Injectable, EventEmitter } from '@angular/core';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  peliculas: PeliculaDetalle[] = [];
  eliminoFavoritoDesdeDetalle = new EventEmitter();
  constructor(private storage:Storage,
    private toastController: ToastController
    ) {
      this.cargarFavoritos();
    }

  guardarPelicula(pelicula: PeliculaDetalle) {
    let existe = false;
    let mensaje = '';
    for ( const peli of this.peliculas ) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }
    if(existe) {
      // si existe en el array entonces la saca de favoritos
      this.peliculas = this.peliculas.filter(pelic => pelic.id !== pelicula.id);
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Argegado a favoritos';
    }
    this.storage.set('peliculas', this.peliculas);
    this.presentToast(mensaje);
    return !existe;
  }

  async presentToast(message = '') {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }
  async cargarFavoritos() {
    const peliculas= await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }
  async existePelicula(id) {
    await this.cargarFavoritos();
    const existe = this.peliculas.find(peli => peli.id == id );
    return (existe) ? true: false;
  }
  OnEliminoFavoritoDesdeDetalle(){
    this.eliminoFavoritoDesdeDetalle.emit();
  }
}
