import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";
import FichaFamiliar from "../familyRecord/FichaFamilar.js";
import Parentesco from "./Parentesco.js";
import NivelEducativo from "./NivelEducativo.js";
import Ocupacion from "./Ocupacion.js";
import Religion from "./Religion.js";
import CargoComunidad from "./cargoCuminadad.js";
import SeguroSalud from "./SeguroSalud.js";
import TipoDiscapacidad from "./TipoDiscapacidad.js";
import AccionEmergencia from "./AccionEmergencia.js";
import GrupoEtnico from "./GrupoEtnico.js";
import { getUUID } from '../../plugins/getUuidPlugin.js';

class Persona extends Model {};

Persona.init ( {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: getUUID
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    apaterno: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    amaterno: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
            isDate: true
        }
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isNumeric: true
        }
    },
    idficha_familiar: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        references: {
            model: FichaFamiliar,
            key: 'id'
        }
    },
    idparentesco: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Parentesco',
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    fecha_ultimo_parto: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
    gestante: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    fecha_probable_parto: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
    edad_gestacional: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: null,
    },
    excede_42_semanas: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null,
    },
    puerpedio: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null
    },
    fecha_parto: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
    dias_puerpedio: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isNumeric: true,
            isInt: true,
            len: [8, 8]
        }
    },
    estado_dni: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    idnivel_educativo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'NivelEducativo',
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    idocupacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Ocupacion',
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    idreligion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Religion',
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    idcargo_comunidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'CargoComunidad',
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    idseguro_salud: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'SeguroSalud',
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    idtipo_discapacidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TipoDiscapacidad',
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    carnet_discapacidad: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    idaccion_emergencia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'AccionEmergencia',
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    idgrupo_etnico: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'GrupoEtnico',
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }

}, {
    sequelize: db,
    modelName: 'Persona',
    tableName: 'persona',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(persona) {
            const {nombres, apaterno, amaterno} = persona;
            if (typeof nombres === 'string') {
                persona.nombres = nombres.trim();
            }
            if (typeof apaterno === 'string') {
                persona.apaterno = apaterno.trim();
            }
            if (typeof amaterno === 'string') {
                persona.amaterno = amaterno.trim();
            }
        }
    }
});

Persona.belongsTo(Parentesco, {
    foreignKey: 'idparentesco',
    as: 'Parentesco'
});

Persona.belongsTo(NivelEducativo, {
    foreignKey: 'idnivel_educativo',
    as: 'NivelEducativo'
});

Persona.belongsTo(Ocupacion, {
    foreignKey: 'idocupacion',
    as: 'Ocupacion'
});

Persona.belongsTo(Religion, {
    foreignKey: 'idreligion',
    as: 'Religion'
});

Persona.belongsTo(CargoComunidad, {
    foreignKey: 'idcargo_comunidad',
    as: 'CargoComunidad'
});

Persona.belongsTo(SeguroSalud, {
    foreignKey: 'idseguro_salud',
    as: 'SeguroSalud'
});

Persona.belongsTo(TipoDiscapacidad, {
    foreignKey: 'idtipo_discapacidad',
    as: 'TipoDiscapacidad'
});

Persona.belongsTo(AccionEmergencia, {
    foreignKey: 'idaccion_emergencia',
    as: 'AccionEmergencia'
});

Persona.belongsTo(GrupoEtnico, {
    foreignKey: 'idgrupo_etnico',
    as: 'GrupoEtnico'
});

// Relacion a ficha familiar (1:N)
Persona.belongsTo(FichaFamiliar, {
    foreignKey: 'idficha_familiar',
    as: 'FichaFamiliar'
});

FichaFamiliar.hasMany(Persona, {
    foreignKey: 'idficha_familiar',
    as: 'Personas'
});

export default Persona;