import { DataTypes, Model } from "sequelize"
import { getUUID } from '../../plugins/getUuidPlugin.js';
import db from "../../config/db.js"
import Persona from "./Persona.js";
import MedioInformacion from "./MedioInformacion.js";

class MediosInfoPersona extends Model {};

MediosInfoPersona.init( {
    id: {
        type: DataTypes.STRING,
        defaultValue: getUUID,
        primaryKey: true,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'MediosInfoPersona',
    tableName: 'medios_info_persona',
    freezeTableName: true,
    timestamps: true
});

Persona.belongsToMany(MedioInformacion, {
    through: 'MediosInfoPersona',
    foreignKey: 'idpersona',
    otherKey: 'idmedios_informacion',
    as: 'MediosInformacion'
});

MedioInformacion.belongsToMany(Persona, {
    through: 'MediosInfoPersona',
    foreignKey: 'idmedios_informacion',
    otherKey: 'idpersona',
    as: 'Persona'
});



export default MediosInfoPersona;