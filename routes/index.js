
import express from 'express'; 
import {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
} from '../controllers/paginasController.js';

import { guardarTestimonial } from '../controllers/testimonialController.js';

const router = express.Router(); // usando la instancia de express y extendiendo a su router

router.get('/', paginaInicio);

router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes);
router.get('/viajes/:slug', paginaDetalleViaje); // Comodín

router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardarTestimonial);

export default router;

