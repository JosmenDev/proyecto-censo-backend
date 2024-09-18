import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";
import Provincia from "./Provincia.js"; 

class Distrito extends Model {};

Distrito.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    idprovincia: {  // Campo de relación con Provincia
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Provincia',  // Relaciona con el modelo Provincia
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
    modelName: 'Distrito',
    tableName: 'distrito',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(distrito) {
            if (typeof distrito.nombre === 'string') {
                distrito.nombre = distrito.nombre.trim();
            }
        }
    }
});

Distrito.belongsTo(Provincia, { 
    foreignKey: 'idprovincia', 
    as: 'Provincia' 
});

export default Distrito;
