package com.adopciones.mascotas.repositories;

import com.adopciones.mascotas.entities.Adopcion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAdopcionRepository extends JpaRepository<Adopcion, Long> {
}
