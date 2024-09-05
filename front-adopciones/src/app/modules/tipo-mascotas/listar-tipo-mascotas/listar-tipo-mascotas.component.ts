import { Component } from '@angular/core';
import { TiposMascotaService } from '../../../services/tipos-mascota.service';
import { TipoMascotaModel } from 'src/app/models/tipo-mascota.model';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-tipo-mascotas',
  templateUrl: './listar-tipo-mascotas.component.html',
  styleUrls: ['./listar-tipo-mascotas.component.css']
})
export class ListarTipoMascotasComponent {

  tipoMascotas: TipoMascotaModel[] = [];
  error: string | null = '';
  constructor(private tiposMascotaService: TiposMascotaService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listarTipoDeMascotas();
  }

  listarTipoDeMascotas() {
    this.tiposMascotaService.getTiposDeMascota().subscribe({
      next:
        (tipoMascotas: TipoMascotaModel[]) => {
          this.tipoMascotas = tipoMascotas;
        },
      error:
        (error: any) => {
          this.error = (error.message || error)
          this.toastr.error("Ocurrio un error inesperado " + this.error)
        }
    });
  }

  eliminarTipoDeMascota(id: number): void {

    Swal.fire({
      title: "Esta seguro de eliminar?",
      text: "Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.tiposMascotaService.deleteTipoMascota(id).subscribe({
          next:
            () => {
              this.listarTipoDeMascotas()
            },
          error:
            (error: any) => {
              this.error = (error.message || error)
              this.toastr.error("Ocurrio un error al eliminar un tipo de mascora, intentelo mas tarde " + this.error)
            }
        })

        Swal.fire({
          title: "Eliminado!",
          text: "Se eliminó el tipo de mascosta con ID: " + id,
          icon: "success"
        });
      }
    });


  }

}
