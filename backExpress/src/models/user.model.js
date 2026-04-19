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
		// Campos para la recuperación de contraseña
		resetPasswordToken: { type: String, select: false },
		resetPasswordExpires: { type: Date, select: false },
		// necesario para el soft delete
		active: { type: Boolean, default: true, select: false }
	}, { timestamps: true }
)

userSchema.pre(/^find/, function () {
	this.find({ active: { $ne: false } })
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
