import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";
import CaracteristicasVivienda from "./CaracteristicasVivienda.js";
import MedidaProteccion from "./MedidaProteccion.js";
import { getUUID } from '../../plugins/getUuidPlugin.js';

class ItemProteccion extends Model {};

ItemProteccion.init ( {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: getUUID
    },
    valor: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false
    }
},{
    sequelize: db,
    modelName: 'ItemProteccion',
    tableName: 'item_proteccion',
    freezeTableName: true,
    timestamps: true
});

// Relacion a medios de informacion (N:M)
CaracteristicasVivienda.belongsToMany(MedidaProteccion, {
    through: 'ItemProteccion',
    foreignKey: 'idcaracteristicas_vivienda',
    otherKey: 'idmedidas_proteccion',
    as: 'MedidasProteccion'
});

MedidaProteccion.belongsToMany(CaracteristicasVivienda, {
    through: 'ItemProteccion',
    foreignKey: 'idmedidas_proteccion',
    otherKey: 'idcaracteristicas_vivienda',
    as: 'CaracteristicasVivienda'
});

export default ItemProteccion;

