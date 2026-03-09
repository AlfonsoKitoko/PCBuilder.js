const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true, select: false },
		firstName: { type: String, required: false },
		lastName: { type: String, required: false },
		email: { type: String, required: true, unique: true },
		birthDate: { type: Date },
		profile: { type: String, required: true, enum: ['ADMIN', 'USER'] },
	},
	{ timestamps: true }
)

/* Ejemplo User:
- username: "usuario123"
- password: "*******"          // no se muestra en queries por select: false
- firstName: "Juan"
- lastName: "Pérez"
- email: "juan.perez@example.com"
- birthDate: "1990-05-14"
- profile: "USER"               // opciones: "ADMIN" o "USER"
- createdAt: "2026-02-28T12:34:56.789Z"
- updatedAt: "2026-02-28T12:34:56.789Z"
*/

export const User = mongoose.model("User", userSchema)