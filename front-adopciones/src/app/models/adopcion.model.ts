import { Adopcion } from "./adopcion.interface";
import { EstadoAdopcion } from "./estado-adopcion.enum";
import { Mascota } from "./mascota.interface";
import { Usuario } from './usuario.interface';

export class AdopcionModel implements Adopcion {
  id: number;
  usuario: Usuario;
  mascotas: Mascota[];
  fechaAdopcion: string;
  estado: EstadoAdopcion;

  constructor(id: number, usuario: Usuario, mascotas: Mascota[], fechaAdopcion: string,
    estado: EstadoAdopcion) {
    this.id = id;
    this.usuario = usuario;
    this.mascotas = mascotas;
    this.fechaAdopcion = fechaAdopcion;
    this.estado = estado;
  }


  // Método adicional para obtener una representación de la fecha de adopción
  obtenerFechaAdopcionFormateada(): string {
    const date = new Date(this.fechaAdopcion);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

}
