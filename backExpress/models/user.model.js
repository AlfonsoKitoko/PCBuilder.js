import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'El nombre de usuario es obligatorio'],
			unique: true,
			trim: true
		},
		password: {
			type: String,
			required: [true, 'La contraseña es obligatoria'],
			select: false,
			// CUMPLIMIENTO PFC: Regex para Mayúscula, Minúscula, Número y Especial
			match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
				'La contraseña debe ser robusta (8+ caracteres, Mayús, Min, Núm y Especial)']
		},
		firstName: { type: String, trim: true },
		lastName: { type: String, trim: true },
		email: {
			type: String,
			required: [true, 'El email es obligatorio'],
			unique: true,
			lowercase: true,
			trim: true,
			match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email no válido']
		},
		birthDate: { type: Date },
		profile: {
			type: String,
			required: true,
			enum: ['ADMIN', 'USER'],
			default: 'USER'
		},
	},
	{ timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User

/* import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
	{
		username: { 
			type: String, 
			required: [true, 'El nombre de usuario es obligatorio'], 
			unique: true,
			trim: true,
			minlength: [3, 'El username debe tener al menos 3 caracteres']
		},
		password: { 
			type: String, 
			required: [true, 'La contraseña es obligatoria'], 
			select: false,
			// REQUISITO PFC: Validación con Regex (Mayúscula, minúscula, número y carácter especial)
			match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
			'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial']
		},
		firstName: { type: String, trim: true },
		lastName: { type: String, trim: true },
		email: { 
			type: String, 
			required: [true, 'El email es obligatorio'], 
			unique: true,
			lowercase: true,
			trim: true,
			// Validación de formato de email
			match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, introduce un email válido']
		},
		birthDate: { 
			type: Date,
			validate: {
				validator: function(v) {
					return v < new Date() // El usuario no puede haber nacido en el futuro
				},
				message: 'La fecha de nacimiento no puede ser futura'
			}
		},
		profile: { 
			type: String, 
			required: true, 
			enum: {
				values: ['ADMIN', 'USER'],
				message: '{VALUE} no es un rol válido'
			},
			default: 'USER'
		},
	},
	{ 
		timestamps: true,
		// Esto asegura que al convertir a JSON (para el Frontend) se use el ID de MongoDB correctamente
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
)

const User = mongoose.model('User', userSchema)

export default User */

/* Ejemplo User:
- username: 'usuario123'
- password: '*******'          // no se muestra en queries por select: false
- firstName: 'Juan'
- lastName: 'Pérez'
- email: 'juan.perez@example.com'
- birthDate: '1990-05-14'
- profile: 'USER'               // opciones: 'ADMIN' o 'USER'
- createdAt: '2026-02-28T12:34:56.789Z'
- updatedAt: '2026-02-28T12:34:56.789Z'
*/
