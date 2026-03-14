const bcrypt = require("bcrypt")  // npm i bcrypt

exports.hashPassword = async (plainTextString) =>
  await bcrypt.hash(plainTextString, 12)

exports.compareLogin = async (plainTextString, codedString) => {
  console.log(`bcrypt: { ${codedString} }`)

  const result = await bcrypt.compare(plainTextString, codedString)

  if (result) return true
  else return false
}