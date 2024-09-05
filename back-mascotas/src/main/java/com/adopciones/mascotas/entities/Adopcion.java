package com.adopciones.mascotas.entities;

import com.adopciones.mascotas.enums.EstadoAdopcion;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "adopciones")
public class Adopcion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToMany(fetch = FetchType.EAGER)
   // @JoinColumn(name = "mascota_id")
    @JoinTable(
            name = "adopcion-mascota",
            joinColumns = @JoinColumn(name = "adopcion_id"),
            inverseJoinColumns = @JoinColumn(name = "mascota_id")
    )
    private Set<Mascota> mascotas;

    @CreationTimestamp
    private LocalDate fechaAdopcion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoAdopcion estado;

}
