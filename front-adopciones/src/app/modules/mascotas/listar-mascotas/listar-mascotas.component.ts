import { Component } from '@angular/core';
import { Mascota } from 'src/app/models/mascota.interface';
import { MascotaService } from '../../../services/mascota.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listar-mascotas',
  templateUrl: './listar-mascotas.component.html',
  styleUrls: ['./listar-mascotas.component.css']
})
export class ListarMascotasComponent {
  mascotas: Mascota[] = [];
  error: string | null = '';
  selectedMascota: Mascota | null = null;


  constructor(private mascotaService: MascotaService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listarMascotas();
  }

  listarMascotas() {
    this.mascotaService.getMascotas().subscribe({

      next:
        (mascotas: Mascota[]) => {
          this.mascotas = mascotas;

          if (this.mascotas.length > 0) {
            this.selectMascota(this.mascotas[0])
          }
        },
      error:
        (error: string) => {
          this.error = error
        }
    });
  }


  selectMascota(mascota: Mascota) {
    this.selectedMascota = mascota;
  }

  eliminarMascotaById(id: number) {
    Swal.fire({
      title: "Estas seguro de eliminar?",
      text: "No se podra revertir la siguiente acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.mascotaService.deleteMascotaId(id).subscribe({
          next:
            () => {
              this.listarMascotas();

              Swal.fire({
                title: "Eliminado",
                text: `la mascota con ID ${id} fue eliminado`,
                icon: "success"
              });
            },
          error:
            (error: any) => {
              this.toastr.error('Ocurrió un error al eliminar la mascota. Inténtalo de nuevo más tarde. ', error)
            }
        })

      }
    });

  }

}
