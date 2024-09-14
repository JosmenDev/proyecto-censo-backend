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

EquipoAsignado.belongsTo( Empleado, {
    foreignKey: 'idempleado',
    as: 'Empleado'
})

export default EquipoAsignado;