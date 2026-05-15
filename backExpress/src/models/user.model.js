import mongoose from 'mongoose'

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'El nombre de usuario es obligatorio'],
			unique: true,
			trim: true,
			lowercase: true
		},
		password: {
			type: String,
			required: [true, 'La contraseña es obligatoria'],
			select: false
		},
		firstName: { type: String, trim: true, lowercase: true },
		lastName: { type: String, trim: true, lowercase: true },
		email: {
			type: String,
			required: [true, 'El email es obligatorio'],
			unique: true,
			lowercase: true,
			trim: true,
			match: [EMAIL_REGEX, 'Email no válido']
		},
		birthDate: { type: Date },
		profile: {
			type: String,
			trim: true,
			uppercase: true,
			enum: ['ADMIN', 'USER'],
			default: 'USER',
			required: true
		},
		slug: { type: String, unique: true, index: true },
		// Campos para la recuperación de contraseña
		resetPasswordToken: { type: String, select: false },
		resetPasswordExpires: { type: Date, select: false },
		// necesario para el soft delete
		active: { type: Boolean, default: true, select: false }
	}, { timestamps: true }
)

// Middleware para generar el slug antes de validar
userSchema.pre('validate', function () {
	if (!this.isModified('username')) return

	// Generamos el slug del username (que ya viene en lowercase por el schema)
	this.slug = this.username
		.trim()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '') // Quita acentos
		.replace(/[^a-z0-9\s-]/g, '')    // Quita caracteres raros
		.replace(/[\s-]+/g, '-')         // Espacios a guiones
		.replace(/^-+|-+$/g, '')         // Limpia extremos
})

userSchema.pre(/^find/, function () {
	const query = this.getQuery()
	if (!query._id) {
		this.where({ active: { $ne: false } })
	}
})

const User = mongoose.model('User', userSchema)

export default User

/* Ejemplo json User:
	{
		"username": "pc_master",
		"password": "SecurePassword123!",
		"firstName": "Alex",
		"lastName": "Hardware",
		"email": "alex@hardware.com",
		"birthDate": "1990-10-20",
		"profile": "admin"
	}
*/
