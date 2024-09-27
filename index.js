// Dependencias
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// User
import empleadoRoutes from './routes/user/empleadoRoutes.js'
import cargoRoutes from './routes/user/cargoRoutes.js'
import authRoutes from './routes/user/authRoutes.js'
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
// import personaRoutes from './routes/person/personaRoutes.js';

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
import fichaFamiliarRoutes from './routes/familyRecord/fichaFamiliarRoutes.js';

import {checkAuth, hasRoles, nameRoles} from './middleware/authMiddleware.js';

// en app se contiene las funcionalidad para crear el servidor
const app = express();

// permito a app recibir datos en formato json
app.use(express.json());

// habilito la opcion para usar las variables de entorno
dotenv.config();

// dominios permitidos
const dominiosPermitidos = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function (origin, collbak) {
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            collbak(null, true);
        }
        else {
            collbak(new Error("No permitido por CORS"));
        }
    }
}

// Cors options
app.use(cors());

// Variables para roles
const {isAdmin, isRegister} = nameRoles;
// Rutas
// User Rutes
app.use('/api/auth', authRoutes);
app.use('/api/empleado', [checkAuth, hasRoles([isAdmin])], empleadoRoutes);
app.use('/api/cargo', [checkAuth, hasRoles([isAdmin])], cargoRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/rol', [checkAuth, hasRoles([isAdmin])], rolRoutes);

// Person Routes
app.use('/api/ocupacion', [checkAuth, hasRoles([isAdmin])], ocupacionRoutes);
app.use('/api/religion', [checkAuth, hasRoles([isAdmin])], religionRoutes);
app.use('/api/parentesco', [checkAuth, hasRoles([isAdmin])], parentescoRoutes);
app.use('/api/cargoComunidad', [checkAuth, hasRoles([isAdmin])], cargoComunidadRoutes);
app.use('/api/tipoDiscapacidad', [checkAuth, hasRoles([isAdmin])], tipoDiscapacidadRoutes);
app.use('/api/accionEmergencia', [checkAuth, hasRoles([isAdmin])], accionEmergenciaRoutes);
app.use('/api/seguroSalud', [checkAuth, hasRoles([isAdmin])], seguroSaludRoutes);
app.use('/api/enfermedad', [checkAuth, hasRoles([isAdmin])], enfermedadRoutes);
app.use('/api/medioInformacion', [checkAuth, hasRoles([isAdmin])], medioInformacionRoutes);
app.use('/api/nivelEducativo', [checkAuth, hasRoles([isAdmin])], nivelEducativoRoutes);
app.use('/api/grupoEtnico', [checkAuth, hasRoles([isAdmin])], grupoEtnicoRoutes);
// app.use('/api/persona', [checkAuth, hasRoles([isAdmin])], personaRoutes);

// Housing Characteristics
app.use('/api/abastecimientoAgua', [checkAuth, hasRoles([isAdmin])], abastecimientoAguaRoutes);
app.use('/api/cloracion', [checkAuth, hasRoles([isAdmin])], cloracionRoutes);
app.use('/api/combustibleCocina', [checkAuth, hasRoles([isAdmin])], combustibleCocinaRoutes);
app.use('/api/disposicionBasura', [checkAuth, hasRoles([isAdmin])], disposicionBasuraRoutes);
app.use('/api/materialVivienda', [checkAuth, hasRoles([isAdmin])], materialViviendaRoutes);
app.use('/api/medidaProteccion', [checkAuth, hasRoles([isAdmin])], medidaProteccionRoutes);
app.use('/api/servicioHigienico', [checkAuth, hasRoles([isAdmin])], servicioHigienicoRoutes);

// Housing Location Routes
app.use('/api/departamento', [checkAuth, hasRoles([isAdmin])], departamentoRoutes);
app.use('/api/provincia', [checkAuth, hasRoles([isAdmin])], provinciaRoutes);
app.use('/api/distrito', [checkAuth, hasRoles([isAdmin])], distritoRoutes);
app.use('/api/centroPoblado', [checkAuth, hasRoles([isAdmin])], centroPobladoRoutes);
app.use('/api/sector', [checkAuth, hasRoles([isAdmin])], sectorRoutes);

// Family Record
app.use('/api/equipoAsignado', [checkAuth, hasRoles([isAdmin])], equipoAsignadoRoutes);
app.use('/api/fichaFamiliar', [checkAuth, hasRoles([isAdmin, isRegister])], fichaFamiliarRoutes);


// Creacion del servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
})