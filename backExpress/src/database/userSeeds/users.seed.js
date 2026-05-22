import 'dotenv/config'
import mongoose from 'mongoose'
import User from '../../models/user.model.js' // Ajusta la ruta según tu carpeta
import { hashPassword } from '../../utils/bcrypt.js'

const seedUsers = async () => {
	try {
		const uri = process.env.MONGODB_ATLAS
		if (!uri) throw new Error('MONGODB_ATLAS no definida en .env')

		await mongoose.connect(new URL(uri).href)
		console.log('++ Conectado para crear Usuarios ++')

		// 1. Limpiar usuarios existentes
		await User.deleteMany({})
		console.log('-- Colección User vaciada --')

		// 2. Preparar contraseña (usamos la misma para todos para facilitar tests)
		const commonPassword = await hashPassword('Password123!')

		// 3. Definir los 6 usuarios (2 Admin y 4 Users)
		const users = [
			{
				username: 'master_admin',
				password: commonPassword,
				firstName: 'boss',
				lastName: 'admin',
				email: 'admin@pcbuilder.com',
				birthDate: new Date('1985-05-15'),
				profile: 'ADMIN'
			},
			{
				username: "administrator",
				password: await hashPassword('AdminPassword123!'),
				firstName: "Admin",
				lastName: "Istrator",
				email: "admin@admin.com",
				birthDate: new Date("1990-10-20"),
				profile: "ADMIN"
			},
			{
				username: 'juan_perez',
				password: commonPassword,
				firstName: 'juan',
				lastName: 'perez',
				email: 'juan@test.com',
				birthDate: new Date('1992-03-10'),
				profile: 'USER'
			},
			{
				username: 'maria_gaming',
				password: commonPassword,
				firstName: 'maria',
				lastName: 'garcia',
				email: 'maria@test.com',
				birthDate: new Date('1995-07-22'),
				profile: 'USER'
			},
			{
				username: 'lucas_builder',
				password: commonPassword,
				firstName: 'lucas',
				lastName: 'modric',
				email: 'lucas@test.com',
				birthDate: new Date('1988-11-30'),
				profile: 'USER'
			},
			{
				username: 'sara_tech',
				password: commonPassword,
				firstName: 'sara',
				lastName: 'connor',
				email: 'sara@test.com',
				birthDate: new Date('2000-01-01'),
				profile: 'USER'
			},
			{
				username: 'alakazam',
				password: commonPassword,
				firstName: 'alaka',
				lastName: 'zam',
				email: 'alakazam951@gmail.com',
				birthDate: new Date('1984-4-11'),
				profile: 'USER'
			},
		]

		// 4. Insertar en la base de datos
		const createdUsers = await User.create(users)

		console.log(`++ ${createdUsers.length} Usuarios creados con éxito ++`)

		// Opcional: Imprimir los IDs por consola para tenerlos a mano
		createdUsers.forEach(u => console.log(`   - ${u.firstName} [${u.profile}]: ${u._id}`))

		await mongoose.connection.close()
		process.exit(0)
	} catch (error) {
		console.error('!! Error en User Seed !!', error)
		process.exit(1)
	}
}

seedUsers()