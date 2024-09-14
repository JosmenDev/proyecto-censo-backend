import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";
import Distrito from "./Distrito.js";  // Importar el modelo relacionado

class Sector extends Model {};

Sector.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            trim(value) {
                if (typeof value === 'string') {
                    this.setDataValue('nombre', value.trim());
                }
            }
        }
    },
    iddistrito: {  // Campo de relación con Distrito
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Distrito',
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
    modelName: 'Sector',
    tableName: 'sector',
    freezeTableName: true,
    timestamps: true
});

// Definir la relación entre Sector y Distrito
Sector.belongsTo(Distrito, { 
    foreignKey: 'iddistrito', 
    as: 'Distrito' 
});

export default Sector;
