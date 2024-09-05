import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoMascotaModel } from 'src/app/models/tipo-mascota.model';
import { MascotaService } from 'src/app/services/mascota.service';
import { TiposMascotaService } from 'src/app/services/tipos-mascota.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mascota } from '../../../models/mascota.interface';

@Component({
  selector: 'app-agregar-tipo-mascotas',
  templateUrl: './agregar-tipo-mascotas.component.html',
  styleUrls: ['./agregar-tipo-mascotas.component.css']
})
export class AgregarTipoMascotasComponent {

  tipoMascotaFormData!: FormGroup;
  errorMessage: string = '';
  isEditMode: boolean = false;
  private routeSub!: Subscription;
  tipoMascotaId!: number;

  constructor(private fb: FormBuilder, private tipoMascotaService: TiposMascotaService,
    private toastr: ToastrService, private route: ActivatedRoute, private router: Router
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.tipoMascotaId = +id
        this.cargarTipoDeMascota();

      }
    })


    this.tipoMascotaFormData = this.fb.group({
      tipo: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: ['', [Validators.required]]
    })
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }



  cargarTipoDeMascota(): void {
    this.tipoMascotaService.getTipoMascotaById(this.tipoMascotaId).subscribe({
      next: (tipoMascota) => {
        this.tipoMascotaFormData.patchValue({
          tipo: tipoMascota.tipo,
          descripcion: tipoMascota.descripcion,
        }),
          console.log('se crago los datos correctamente');
      },
      error: (error) => {
        this.errorMessage = (error.message || error)
        this.toastr.error("Ocurrio un error al cargar tipo de mensaje " + this.errorMessage);
      }
    })
  }


  onSubmit(): void {
    if (this.tipoMascotaFormData.invalid) {
      this.tipoMascotaFormData.markAllAsTouched();
      return;
    }
    const tipoMascota: TipoMascotaModel = this.tipoMascotaFormData.value;

    if (this.isEditMode) {
      this.tipoMascotaService.updateTipoMAscota(this.tipoMascotaId, tipoMascota).subscribe({
        next:
          (response) => {
            this.toastr.success("Tipo de mascota actualizada con éxito")
            this.router.navigate(['/tipo-mascotas'])
          },
        error:
          (error) => {
            this.errorMessage = (error.messge || error);
            this.toastr.error("Error al guardar el tipo de mascota " + this.errorMessage)
          }
      })
    } else {
      this.tipoMascotaService.createTipoMascota(tipoMascota).subscribe({
        next:
          (response) => {
            this.toastr.success("Tipo de mascota creada com exito");
            this.tipoMascotaFormData.reset();
          },
        error:
          (error) => {
            this.errorMessage = (error.message || error);
            this.toastr.error("Error al guargadr  tipo de mascota ", this.errorMessage);
          }
      });

    }


  }

}
