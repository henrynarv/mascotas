import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TiposMascotaService } from '../../../services/tipos-mascota.service';
import { MascotaService } from '../../../services/mascota.service';
import { MascotaModel } from '../../../models/mascota.model';
import { TipoMascotaModel } from 'src/app/models/tipo-mascota.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Mascota } from 'src/app/models/mascota.interface';
import { Adopcion } from '../../../models/adopcion.interface';

@Component({
  selector: 'app-agregar-mascotas',
  templateUrl: './agregar-mascotas.component.html',
  styleUrls: ['./agregar-mascotas.component.css']
})
export class AgregarMascotasComponent implements OnInit {

  mascotaForm!: FormGroup;
  tiposMascota: TipoMascotaModel[] = [];
  errorMessage: string = '';
  fileError: string = '';
  nombreFile: string = '';
  fileUrl: string | undefined = '';
  mascotaId!: number;
  isEditMode: boolean = false;

  private routeSub!: Subscription;

  constructor(private fb: FormBuilder, private tiposMascotaService: TiposMascotaService,
    private mascotaService: MascotaService, private toastr: ToastrService,
    private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.mascotaId = +id;
        this.cargarMascota();


      }

    })




    this.mascotaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      edad: [0, [Validators.required, Validators.min(0)]],
      tipoMascotaId: ['', Validators.required],
      isAdoptado: [false],
      imagen: [null]
    });

    this.tiposMascotaService.getTiposDeMascota().subscribe({
      next:
        (tipos) => this.tiposMascota = tipos,
      error:
        (error) => console.error('error al cargar tipos de mascota ', error)
    });
  }

  ngOnDestroy(): void {

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }



  cargarMascota(): void {
    this.mascotaService.getMascotaById(this.mascotaId).subscribe({
      next: (mascota) => {
        this.mascotaForm.patchValue({
          nombre: mascota.nombre,
          edad: mascota.edad,
          tipoMascotaId: mascota.tipoMascota.id,
          imagen: mascota.imageUrl,
          //isAdoptado: mascota.isAdoptado
        });
        console.log("mascota.imageUrl", mascota.imageUrl)
        console.log("this.fileUrl", this.fileUrl);
        this.fileUrl = mascota.imageUrl;
        this.nombreFile = this.extractFileNameFromUrl(this.fileUrl);
        console.log('Hola Mundo', this.extractFileNameFromUrl(this.fileUrl));
      },
      error: (error) => {
        this.errorMessage = error.message || error;
        this.toastr.error('Error al cargar los datos de la mascota', this.errorMessage);
      }

    })
  }


  onSubmit(): void {
    // this.toastr.success("Operación realizada con exito");

    if (this.mascotaForm.invalid) {
      this.mascotaForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append("nombre", this.mascotaForm.get("nombre")?.value);
    formData.append("edad", this.mascotaForm.get("edad")?.value);
    formData.append("tipoMascotaId", this.mascotaForm.get("tipoMascotaId")?.value);
    formData.append("isAdoptado", this.mascotaForm.get("isAdoptado")?.value);


    const imagen = this.mascotaForm.get("imagen")?.value;
    if (imagen instanceof File) {
      formData.append("imagen", imagen);
    } else {
      // Si no se ha seleccionado una nueva imagen, se agrega la URL de la imagen actual.
      formData.append("imagen", this.fileUrl || '');  // 'fileUrl' contiene la URL actual.
    }

    // formData.append("imagen", this.mascotaForm.get("imagen")?.value);

    if (this.isEditMode) {
      this.mascotaService.updateMascota(this.mascotaId, formData).subscribe({
        next: (response) => {
          this.toastr.success("Mascota actualizada con éxito");
          this.router.navigate(['/']);
        }
      });
    } else {

      this.mascotaService.createMascota(formData).subscribe({
        next:
          (response) => {
            console.log("mascota guardada", response);
            this.toastr.success("mascota creada con exito");
            this.mascotaForm.reset({ edad: 0 });
            this.nombreFile = '';
            this.fileUrl = '';

          },
        error:
          (error) => {
            this.errorMessage = (error.message || error);
            this.toastr.error('Error al guardar mascota ', this.errorMessage)

          }


      });

    }

  }

  onCancel() {
    if (this.isEditMode) {
      this.router.navigate(['/'])
    } else {
      this.mascotaForm.reset({ edad: 0 })
      this.nombreFile = '';
      this.fileUrl = '';
    }

  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.validateFile(file);
    }
  }

  //REVISAR Y ENTENDERLO
  private validateFile(file: File): void {
    // Limpia los errores y valores antiguos antes de validar
    this.fileError = '';
    this.nombreFile = '';
    this.fileUrl = '';

    if (!file) {
      return;
    }


    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      this.fileError = 'El tipo de archivo no es permitido. Solo se admiten imágenes JPG, PNG y GIF.';
      this.toastr.error(this.fileError);


      return;
    }

    const masxSize = 3 * 1024 * 1024;
    if ((file.size > masxSize)) {
      this.fileError = 'El tamaño del archivo excede el límite máximo de 3 MB.';
      this.toastr.error(this.fileError);

      return;
    }

    // Si el archivo es válido, actualiza el nombre y la vista previa
    this.nombreFile = `"${file.name}"`;
    this.mascotaForm.patchValue({ imagen: file });
    this.previewFile(file);
  }



  //maneja el arrastre y sielta de archivos
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();




    const file = event.dataTransfer?.files[0];
    if (file) {
      this.validateFile(file);
    }
  }

  //maneja el arrastre y sielta de archivos
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }


  // previzualiza el archivo
  private previewFile(file: File) {
    const reader = new FileReader()
    reader.onload = (e: any) => {
      this.fileUrl = e.target.result;
      console.log('fileUrl', this.fileUrl);
    };
    reader.readAsDataURL(file);
  }



  // EXTRAER EL NOMBRE DE LA IMAGENDE LA URL
  private extractFileNameFromUrl(url: string | undefined): string {
    if (!url) {
      return '';
    }
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
  }


}

