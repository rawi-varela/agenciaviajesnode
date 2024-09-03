import { Viaje } from "../models/Viajes.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => { // req-quest lo que enviamos : res-ponse lo que express responde

    // Consultar 3 viajes y testimoniales al mismo tiempo
    const promiseDB = [];

    promiseDB.push( Viaje.findAll({ limit: 3}) );
    promiseDB.push( Testimonial.findAll({ limit: 3}) );

    try {
        const resultado = await Promise.all(promiseDB);

        res.render('inicio', { //nombre del archvio
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }
}

const paginaNosotros = (req, res) => { 
    res.render('nosotros', {
        pagina: 'Nosotros'
    }); 
}

const paginaViajes = async (req, res) => { 
    // Consultar la BD
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    }); 
}

const paginaTestimoniales = async (req, res) => { 

    try {
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        }); 
    } catch (error) {
        console.log(error);
    }
}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;// params se asocia con el comonín que se puso en el router

    try {
        const viaje = await Viaje.findOne({ where : { slug }});
        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje
        });
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}