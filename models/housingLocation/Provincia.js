import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";
import Departamento from "./Departamento.js";

class Provincia extends Model {};

Provincia.init( {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    iddepartamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Departamento',
            key: 'id'
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
}, {
    sequelize: db,
    modelName: 'Provincia',
    tableName: 'provincia',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(provincia) {
            if (typeof provincia.nombre === 'string') {
                provincia.nombre = provincia.nombre.trim();
            }
        }
    }
});

Provincia.belongsTo( Departamento, {
    foreignKey: 'iddepartamento',
    as: 'Departamento'
});

export default Provincia;
