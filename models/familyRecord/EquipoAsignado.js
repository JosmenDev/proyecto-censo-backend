import { Model, DataTypes } from 'sequelize'; 
import db from '../../config/db.js'
import Sector from '../housingLocation/Sector.js';
import Empleado from '../user/Empleado.js';

class EquipoAsignado extends Model {}

EquipoAsignado.init( {
    
    idsector: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Sector',
            key: 'id'
        }
    },
    idempleado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Empleado',
            key: 'id'
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},{
    sequelize: db,
    modelName: 'EquipoAsignado',
    tableName: 'equipo_asignado',
    freezeTableName: true,
    timestamps: true
});

EquipoAsignado.belongsTo( Sector, {
    foreignKey: 'idsector',
    as: 'Sector'
});

Sector.hasMany( EquipoAsignado, {
    foreignKey: 'idsector',
    as: 'Personal del Sector'
});

EquipoAsignado.belongsTo( Empleado, {
    foreignKey: 'idempleado',
    as: 'Empleado'
});

Empleado.hasMany( EquipoAsignado, {
    foreignKey: 'idempleado',
    as: 'Sector del Empleado'
});

export default EquipoAsignado;