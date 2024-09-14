import db from '../../config/db.js';
import generarId from '../../helpers/generarId.js';
import { Model, DataTypes } from 'sequelize';
import Empleado from '../user/Empleado.js';


class FichaFamiliar extends Model {}

FichaFamiliar.init({

    idficha_familiar: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
        defaultValue: generarId()
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

FichaFamiliar.hasMany(Persona, {
    foreignKey: 'idficha_familiar',
    as: 'Personas'
})

export default FichaFamiliar;
