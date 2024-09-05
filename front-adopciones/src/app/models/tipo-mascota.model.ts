import { MascotaModel } from "./mascota.model";

export class TipoMascotaModel {
  id: number;
  tipo: string;

  mascotas: MascotaModel[] = [];
  descripcion?: string;

  constructor(id: number, tipo: string, mascotas?: MascotaModel[],
    descripcion?: string) {

    this.id = id;
    this.tipo = tipo;
    if (mascotas) {
      this.mascotas = mascotas;
    }

    if (descripcion) {
      this.descripcion = descripcion;
    }

  }

  agregarMascota(mascota: MascotaModel) {
    this.mascotas.push(mascota);
  }

  eliminarMascota(mascota: MascotaModel) {
    this.mascotas = this.mascotas.filter(m => m !== mascota);
  }
}
