import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";
import MedioInformacion from "./MedioInformacion.js";
import Persona from "./Persona.js";
import { getUUID } from '../../plugins/getUuidPlugin.js';

class PersonaMediosInfo extends Model {};

PersonaMediosInfo.init ( {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: getUUID
    }
},{
    sequelize: db,
    modelName: 'PersonaMediosInfo',
    tableName: 'medios_info_persona',
    freezeTableName: true,
    timestamps: true
});

// Relacion a medios de informacion (N:M)
Persona.belongsToMany(MedioInformacion, {
    through: 'PersonaMediosInfo',
    foreignKey: 'idpersona',
    otherKey: 'idmedios_informacion',
    as: 'Persona'
});

MedioInformacion.belongsToMany(Persona, {
    through: 'PersonaMediosInfo',
    foreignKey: 'idmedios_informacion',
    otherKey: 'idpersona',
    as: 'Medios de Informacion'
});

export default PersonaMediosInfo;

