package com.adopciones.mascotas.services;

import com.adopciones.mascotas.entities.Mascota;
import com.adopciones.mascotas.repositories.IMascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
@Service
public class MascotaServiceImpl implements  IMascotaService{
    @Autowired
    private IMascotaRepository mascotaRepository;

    @Autowired private UploadFile uploadFile;
    @Override
    public List<Mascota> listarMascotas() {
        return mascotaRepository.findAll();
    }

    @Override
    public Optional<Mascota> buscarPorId(Long id) {
        return mascotaRepository.findById(id);
    }

    @Override
    public Mascota gurdarMascota(Mascota mascota, MultipartFile image) throws IOException {

        // Solo actualizar la URL de la imagen si se proporciona una nueva imagen
        if (image != null && !image.isEmpty()) {
            String imageUrl = uploadFile.upload(image);
            mascota.setImageUrl(imageUrl);
            //Actualizar Imagen: Solo se actualiza la URL de la imagen si se proporciona una nueva imagen. Si no se proporciona, la URL de la imagen existente no se cambia.
        }

        return mascotaRepository.save(mascota);
    }

    @Override
    public void eliminarMascota(Long id) {
        mascotaRepository.deleteById(id);
    }
}
