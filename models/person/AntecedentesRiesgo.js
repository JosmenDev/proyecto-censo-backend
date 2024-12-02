import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";
import { getUUID } from '../../plugins/getUuidPlugin.js';
import Persona from "./Persona.js";
import Enfermedad from "./Enfermedad.js";

class AntecedentesRiesgo extends Model {};

AntecedentesRiesgo.init ( {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: getUUID
    },
    otro_descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    diagnostico_dx: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    riesgo_r: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
},{
    sequelize: db,
    modelName: 'AntecedentesRiesgo',
    tableName: 'antecedentes_riesgos',
    freezeTableName: true,
    timestamps: true
});

// Relacion a medios de informacion (N:M)
Persona.belongsToMany(Enfermedad, {
    through: AntecedentesRiesgo,
    foreignKey: 'idpersona',
    otherKey: 'idenfermedad',
    as: 'Enfermedades'
});

Enfermedad.belongsToMany(Persona, {
    through: AntecedentesRiesgo,
    foreignKey: 'idenfermedad',
    otherKey: 'idpersona',
    as: 'Persona'
});

export default AntecedentesRiesgo;

