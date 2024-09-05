package com.adopciones.mascotas.controllers;

import com.adopciones.mascotas.entities.Mascota;
import com.adopciones.mascotas.entities.TipoMascota;
import com.adopciones.mascotas.entities.Usuario;
import com.adopciones.mascotas.services.IMascotaService;
import com.adopciones.mascotas.services.ITipoMascotaService;
import com.adopciones.mascotas.services.MascotaServiceImpl;
import com.adopciones.mascotas.services.UploadFile;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;


@Slf4j
@RestController
@RequestMapping("/api/mascotas")
@CrossOrigin(origins = "http://localhost:4200")
public class MascotaController {

    @Autowired
    private IMascotaService mascotaService;

    @Autowired
    private ITipoMascotaService tipoMascotaService;

    @Autowired
    private UploadFile uploadFile;

    @GetMapping
    public ResponseEntity<?> listarMascota(){
        try {
            List<Mascota> mascotas = mascotaService.listarMascotas();
            return ResponseEntity.ok(mascotas);
        }catch (Exception e){
            String mensaje = "Error al listar mascota: " ;
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(mensaje +" "+e.getMessage());
        }
    }

    @GetMapping("/{id}")
    ResponseEntity<?> buscarMascotaPorId(@PathVariable Long id){
        try {
            Optional<Mascota> buscarMascota = mascotaService.buscarPorId(id);

            if(buscarMascota.isPresent()){
                Mascota mascota = buscarMascota.get();
                String mensaje = "Mascota encontrada con ID: " +id;
                return ResponseEntity.ok().body(mascota);
            }
            else{
                String mensaje = "No se encontro ninguna mascota con ID: " +id;
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensaje);
            }


        }catch (Exception e){
            String mensaje = "Error al obtener usuario por ID: "+ id;
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensaje+" "+ e.getMessage());
        }

    }

    @PostMapping
    public ResponseEntity<?> guargarMascota(@RequestParam("nombre") String nombre,
                                            @RequestParam("edad") Integer edad,
                                            @RequestParam("tipoMascotaId") Long tipoMascotaId,
                                            /** @RequestParam("adoptado") boolean adoptado,**/
                                            //@RequestParam("imagen")MultipartFile imagen
                                            @RequestParam(value = "imagen", required = false) MultipartFile imagen
                                            ){
        try {

            TipoMascota tipoMascota = tipoMascotaService.buscarPorId(tipoMascotaId)
                    .orElseThrow(() -> new IllegalArgumentException("Tipo de mascota no encontrado"));

            Mascota mascotaNueva = new Mascota();
            mascotaNueva.setNombre(nombre);
            mascotaNueva.setTipoMascota(tipoMascota);
           /** mascotaNueva.setAdoptado(adoptado); **/
            mascotaNueva.setEdad(edad);


            String imageUrl = uploadFile.upload(imagen);
            mascotaNueva.setImageUrl(imageUrl);

            Mascota mascotaGuardado = mascotaService.gurdarMascota(mascotaNueva,imagen);

            return ResponseEntity.status(HttpStatus.CREATED).body(mascotaGuardado);
        }catch (Exception e){
            String mensaje = "Error al guardar mascota ";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(mensaje+" "+e.getMessage());
        }


    }


    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarMascota(@RequestParam("nombre") String nombre,
                                                @RequestParam("edad") Integer edad,
                                                @RequestParam("tipoMascotaId") Long tipoMascotaId,
                                               //@RequestParam("isAdoptado") boolean isAdoptado,
                                                @RequestParam(value = "imagen", required = false) MultipartFile imagen,
                                                @PathVariable Long id){

        try {
            Optional<Mascota> mascotaActualOptional = mascotaService.buscarPorId(id);
            if(mascotaActualOptional.isPresent()){
                Mascota mascotaActual = mascotaActualOptional.get();

                TipoMascota tipoMascota = tipoMascotaService.buscarPorId(tipoMascotaId)
                                .orElseThrow(() ->new  IllegalArgumentException("El tipo de mascota no existe"));


                mascotaActual.setNombre(nombre);
                mascotaActual.setEdad(edad);
                //mascotaActual.setAdoptado(isAdoptado);
                mascotaActual.setTipoMascota(tipoMascota);

                // Manejar la actualización de la imagen, si se proporciona una nueva imagen
                if(imagen != null && !imagen.isEmpty()){

                    log.info("imagen"+imagen);
                    //elimina la imagen anterior
                    String imageUrl = mascotaActual.getImageUrl();
                    log.info("magenurl"+ imageUrl);

                    if(imageUrl != null && !imagen.isEmpty()){
                        String imageName = imageUrl.substring(imageUrl.lastIndexOf('/')+1);

                        //si la iagen es las imagen por defecto no la elimina
                        if(!"defaul.jpg".equals(imageName)){
                            uploadFile.delete(imageName);
                        }else{
                            System.out.println("No se eliminará la imagen por defecto: " + imageName);
                        }

                    }
                    //cargar la imagen y obtener la url generada
                    String newImageUrl = uploadFile.upload(imagen);
                    mascotaActual.setImageUrl(newImageUrl);
                }

                //Guardar la mascota actualizada
                Mascota mascotaActulizada = mascotaService.gurdarMascota(mascotaActual, imagen);
                return ResponseEntity.ok().body(mascotaActulizada);

            }else{
                String mensaje = "El usuario con ID " + id + " no existe ";
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensaje);
            }
        } catch (IOException e) {
            String mensaje = "Error al actualizar usuario con ID " + id;
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mensaje + " " + e.getMessage());
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarMascota(@PathVariable Long id){
        try {
            Optional<Mascota> mascotaOpt = mascotaService.buscarPorId(id);
            if(mascotaOpt.isPresent()){
                Mascota mascota = mascotaOpt.get();
                mascotaService.eliminarMascota(id);

                //eliminar imagen del usuario
                String imageUrl = mascota.getImageUrl();
                if(imageUrl != null && !imageUrl.isEmpty()){
                    String imageName = imageUrl.substring(imageUrl.lastIndexOf('/')+1);
                    if(!"default.jpg".equals(imageName)){
                        uploadFile.delete(imageName);
                    }else{
                        System.out.println("No se eliminará la imagen por defecto: " + imageName);
                    }
                }
                return ResponseEntity.ok().body("Se elimino la mascota con ID "+id);
            }else{
                String mensaje = "Mascota no encotrado con ID: "+id;
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(mensaje);
            }

        }catch (Exception e){
            String mensaje = "Error al eliminar mascota ";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(mensaje+" "+mensaje);
        }
    }
}
