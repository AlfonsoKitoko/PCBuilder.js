import bcrypt from 'bcrypt'  // npm i bcrypt

export const hashPassword = async (plainTextString) =>
	await bcrypt.hash(plainTextString, 12)

export const comparePassword = async (plainTextString, codedString) => {
	console.log(`bcrypt: { ${codedString} }`)

	const result = await bcrypt.compare(plainTextString, codedString)

	if (result) return true
	else return false
}