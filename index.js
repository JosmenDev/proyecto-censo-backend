// Dependencias
import express from 'express';
import dotenv from 'dotenv';

// User
import empleadoRoutes from './routes/user/empleadoRoutes.js'
import cargoRoutes from './routes/user/cargoRoutes.js'
import authRoutes from './routes/person/authRoutes.js'
import usuarioRoutes from './routes/user/usuarioRoutes.js'
import rolRoutes from './routes/user/rolRoutes.js'

// Person
import ocupacionRoutes from './routes/person/ocupacionRoutes.js'
import religionRoutes from './routes/person/religionRoutes.js'
import parentescoRoutes from './routes/person/parentescoRoutes.js'
import cargoComunidadRoutes from './routes/person/cargoComunidadRoutes.js'
import tipoDiscapacidadRoutes from './routes/person/tipoDiscapacidadRoutes.js'
import accionEmergenciaRoutes from './routes/person/accionEmergenciaRoutes.js';
import seguroSaludRoutes from './routes/person/seguroSaludRoutes.js';
import enfermedadRoutes from './routes/person/enfermedadRoutes.js';
import medioInformacionRoutes from './routes/person/medioInformacionRoutes.js';
import nivelEducativoRoutes from './routes/person/nivelEducativoRoutes.js';
import grupoEtnicoRoutes from './routes/person/grupoEtnicoRoutes.js';

// Housing Characteristics
import abastecimientoAguaRoutes from './routes/houstingCharacteristics/abastecimientoAguaRoutes.js';
import cloracionRoutes from './routes/houstingCharacteristics/cloracionRoutes.js';
import combustibleCocinaRoutes from './routes/houstingCharacteristics/combustibleCocinaRoutes.js';
import disposicionBasuraRoutes from './routes/houstingCharacteristics/disposicionBasuraRoutes.js';
import materialViviendaRoutes from './routes/houstingCharacteristics/materialViviendaRoutes.js';
import medidaProteccionRoutes from './routes/houstingCharacteristics/medidaProteccionRoutes.js';
import servicioHigienicoRoutes from './routes/houstingCharacteristics/servicioHigienicoRoutes.js';

// Housting Location
import departamentoRoutes from './routes/housingLocation/departamentoRoutes.js';
import provinciaRoutes from './routes/housingLocation/provinciaRoutes.js';
import distritoRoutes from './routes/housingLocation/distritoRoutes.js';
import centroPobladoRoutes from './routes/housingLocation/centroPobladoRoutes.js';
import sectorRoutes from './routes/housingLocation/sectorRoutes.js';

// Family Record
import equipoAsignadoRoutes from './routes/familyRecord/equipoAsignadoRoutes.js';

import {checkAuth, isRegister, isAdmin} from './middleware/authMiddleware.js';

// en app se contiene las funcionalidad para crear el servidor
const app = express();
// permito a app recibir datos en formato json
app.use(express.json());

// habilito la opcion para usar las variables de entorno
dotenv.config();

// Rutas
// User Rutes
app.use('/api/auth', authRoutes);
app.use('/api/empleado', [checkAuth, isAdmin], empleadoRoutes);
app.use('/api/cargo', [checkAuth, isAdmin], cargoRoutes);
app.use('/api/usuario', [checkAuth, isAdmin], usuarioRoutes);
app.use('/api/rol', [checkAuth, isAdmin], rolRoutes);

// Person Routes
app.use('/api/ocupacion', [checkAuth, isAdmin], ocupacionRoutes);
app.use('/api/religion', [checkAuth, isAdmin], religionRoutes);
app.use('/api/parentesco', [checkAuth, isAdmin], parentescoRoutes);
app.use('/api/cargoComunidad', [checkAuth, isAdmin], cargoComunidadRoutes);
app.use('/api/tipoDiscapacidad', [checkAuth, isAdmin], tipoDiscapacidadRoutes);
app.use('/api/accionEmergencia', [checkAuth, isAdmin], accionEmergenciaRoutes);
app.use('/api/seguroSalud', [checkAuth, isAdmin], seguroSaludRoutes);
app.use('/api/enfermedad', [checkAuth, isAdmin], enfermedadRoutes);
app.use('/api/medioInformacion', [checkAuth, isAdmin], medioInformacionRoutes);
app.use('/api/nivelEducativo', [checkAuth, isAdmin], nivelEducativoRoutes);
app.use('/api/grupoEtnico', [checkAuth, isAdmin], grupoEtnicoRoutes);

// Housing Characteristics
app.use('/api/abastecimientoAgua', [checkAuth, isAdmin], abastecimientoAguaRoutes);
app.use('/api/cloracion', [checkAuth, isAdmin], cloracionRoutes);
app.use('/api/combustibleCocina', [checkAuth, isAdmin], combustibleCocinaRoutes);
app.use('/api/disposicionBasura', [checkAuth, isAdmin], disposicionBasuraRoutes);
app.use('/api/materialVivienda', [checkAuth, isAdmin], materialViviendaRoutes);
app.use('/api/medidaProteccion', [checkAuth, isAdmin], medidaProteccionRoutes);
app.use('/api/servicioHigienico', [checkAuth, isAdmin], servicioHigienicoRoutes);

// Housing Location Routes
app.use('/api/departamento', [checkAuth, isAdmin], departamentoRoutes);
app.use('/api/provincia', [checkAuth, isAdmin], provinciaRoutes);
app.use('/api/distrito', [checkAuth, isAdmin], distritoRoutes);
app.use('/api/centroPoblado', [checkAuth, isAdmin], centroPobladoRoutes);
app.use('/api/sector', [checkAuth, isAdmin], sectorRoutes);

// Family Record
app.use('/api/equipoAsignado', [checkAuth, isAdmin], equipoAsignadoRoutes);

// Creacion del servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
})