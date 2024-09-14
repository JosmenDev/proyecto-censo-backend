import jwt from 'jsonwebtoken';

// Generar token de sesion
const generarJWT = (id) => {
    return jwt.sign( {id} , process.env.JWT_SECRET, {
        // Expirar el JWT
        expiresIn: "30d"
    });
}

export default generarJWT;