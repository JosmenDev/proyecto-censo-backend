import { DataTypes, Model } from "sequelize";
import generarId from "../../helpers/generarId";
import db from "../../config/db";

class Persona extends Model {};

Persona.init ( {
    idpersona: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: generarId()
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
    idtipo_capacidad: {
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
    idtipo_capacidad: {
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
            if (condition) {
                
            }
        }
    }
})