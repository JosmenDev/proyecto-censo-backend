import db from '../../config/db.js';
import generarId from '../../helpers/generarId.js';
import { Model, DataTypes } from 'sequelize';


class FichaFamiliar extends Model {}

FichaFamiliar.init({

    idficha_familiar: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
        defaultValue: generarId()
    },
    idequipo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sector_ficha: {
        type: DataTypes.STRING(15),
        allowNull: true
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
    timestamps: true
    }
);

export default FichaFamiliar;
