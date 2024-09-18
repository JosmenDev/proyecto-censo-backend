import { DataTypes, Model } from "sequelize"
import {v4 as uuid4} from "uuid"
import db from "../../config/db.js"
import Persona from "./Persona.js";
import MedioInformacion from "./MedioInformacion.js";

class MediosInfoPersona extends Model {};

MediosInfoPersona.init( {
    id: {
        type: DataTypes.STRING,
        defaultValue: uuid4,
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