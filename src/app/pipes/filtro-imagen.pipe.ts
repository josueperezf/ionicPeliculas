import { Pipe, PipeTransform } from '@angular/core';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Pipe({
  name: 'filtroImagen'
})
export class FiltroImagenPipe implements PipeTransform {

  transform(peliculas: PeliculaDetalle[] ): unknown {

    // la siguiente linea filtra y retorna las peliculas que tengan la backdrop_path como no nula o que exista mejor dicho
    return peliculas.filter((pelicula) => pelicula.backdrop_path);
  }

}
