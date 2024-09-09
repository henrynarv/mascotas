package com.adopciones.mascotas.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="mascotas")
public class Mascota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private Integer edad;



    @ManyToOne
    @JoinColumn(name = "tipo_mascota_id")
    @JsonManagedReference
    private TipoMascota tipoMascota;

    private boolean adoptado = true;

    private String imageUrl;


    public void adoptar(){
        this.adoptado = true;
    }

    //getter y setters





}
