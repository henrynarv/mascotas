package com.adopciones.mascotas.services;

import com.adopciones.mascotas.entities.Adopcion;
import com.adopciones.mascotas.entities.Mascota;
import com.adopciones.mascotas.entities.TipoMascota;
import com.adopciones.mascotas.entities.Usuario;
import com.adopciones.mascotas.enums.EstadoAdopcion;
import com.adopciones.mascotas.repositories.IAdopcionRepository;
import com.adopciones.mascotas.repositories.IMascotaRepository;
import com.adopciones.mascotas.repositories.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AdopcionServiceImpl implements IAdopcionService{
    @Autowired
    private IAdopcionRepository adopcionRepository;
    @Autowired
    private IUsuarioRepository usuarioRepository;

    @Autowired
    private IMascotaRepository mascotaRepository;

    @Override
    public List<Adopcion> listarAdopciones() {
        return adopcionRepository.findAll();
    }

    @Override
    public Optional<Adopcion> buscarPorId(Long id) {
        return adopcionRepository.findById(id);
    }



    @Override
    public Adopcion guardarAdopcion(Adopcion adopcion) {
        Usuario usuario = usuarioRepository.findById(adopcion.getUsuario().getId()).orElse(null);
        Set<Mascota> mascotas = adopcion.getMascotas().stream()
                .map(mascota -> mascotaRepository.findById(mascota.getId()).orElse(null))
                .collect(Collectors.toSet());

        for (Mascota mascota : mascotas){
            mascota.adoptar();
            mascotaRepository.save(mascota);
        }

        if (usuario != null) {
            adopcion.setUsuario(usuario);
        }
        adopcion.setMascotas(mascotas);
        adopcion.setEstado(EstadoAdopcion.PENDIENTE);

        return adopcionRepository.save(adopcion);
    }

    @Override
    public void eliminarAdopcion(Long id) {
        adopcionRepository.deleteById(id);
    }
}
