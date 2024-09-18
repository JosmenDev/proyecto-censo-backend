import db from '../../config/db.js';
// import generarId from '../../helpers/generarId.js';
import { Model, DataTypes } from 'sequelize';
import Empleado from '../user/Empleado.js';
import { v4 as uuid4 } from 'uuid';

class FichaFamiliar extends Model {}    

FichaFamiliar.init({

    id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid4
    },
    fecha_ficha: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
            isDate: true
        }
    },
    idempleado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Empleado',
            key: 'id'
        }
    },
    resultado_aplicacion: {
        type: DataTypes.STRING(60),
        allowNull: true
    },
    apellidos_familia: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
    }, {
    sequelize: db,
    modelName: 'FichaFamiliar',
    tableName: 'ficha_familiar',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(fichaFamiliar) {
            const { resultado_aplicacion, apellidos_familia } = fichaFamiliar;

            if (typeof resultado_aplicacion === 'string' ) {
                fichaFamiliar.resultado_aplicacion = resultado_aplicacion.trim();
            }

            if (typeof apellidos_familia === 'string') {
                fichaFamiliar.apellidos_familia = apellidos_familia.trim();
            }
        }
    }
    }
);

FichaFamiliar.belongsTo(Empleado, {
    foreignKey: 'idempleado',
    as: 'Empleado'
});

Empleado.hasMany(FichaFamiliar, {
    foreignKey: 'idempleado',
    as: 'Fichas Familiares'
});

export default FichaFamiliar;
