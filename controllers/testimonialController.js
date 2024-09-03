import { Testimonial } from '../models/Testimoniales.js';

const guardarTestimonial = async (req, res)  => {
    console.log(req.body);
    const { nombre, correo, mensaje } = req.body; // req.body es lo que se coloca en el form

    const errores = [];

    if(nombre.trim() === '') {
        errores.push({mensaje : 'Agrega tu Nombre'})
    }
    if(correo.trim() === '') {
        errores.push({mensaje : 'Tu Correo es Obligatorio'})
    }
    if(mensaje.trim() === '') {
        errores.push({mensaje : 'El mensaje no puede ir vacio'})
    }

    if(errores.length > 0 ){
        const testimoniales = await Testimonial.findAll(); // Testimoniales existentes

        // Mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre, 
            correo, 
            mensaje,
            testimoniales,
        });
    } else {
        // Almacenarlo en la BD
        try {
            await Testimonial.create({
                nombre, 
                correo,
                mensaje
            });

            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }

};


export {
    guardarTestimonial
}
