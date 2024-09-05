package com.adopciones.mascotas.services;

import com.adopciones.mascotas.entities.Mascota;
import lombok.extern.java.Log;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface IMascotaService {

    List<Mascota> listarMascotas();
    Optional<Mascota> buscarPorId(Long id);
    Mascota gurdarMascota(Mascota mascota, MultipartFile image) throws IOException;
    void eliminarMascota(Long id);
}
