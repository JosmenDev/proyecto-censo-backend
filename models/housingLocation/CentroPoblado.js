import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";
import Distrito from "./Distrito.js";  // Importar el modelo relacionado

class CentroPoblado extends Model {};

CentroPoblado.init({
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
    modelName: 'CentroPoblado',
    tableName: 'centro_poblado',
    freezeTableName: true,
    timestamps: true
});

// Definir la relación entre CentroPoblado y Distrito
CentroPoblado.belongsTo(Distrito, { 
    foreignKey: 'iddistrito', 
    as: 'distrito' 
});

export default CentroPoblado;
