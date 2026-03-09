// --> models > services > controller > routes

// npm i dotenv express path method-override cors mongoose ejs

const swaggerUI = require("swagger-ui-express")	// npm i swagger-jsdoc swagger-ui-express
const specs = require("./swagger/swagger")

require("dotenv").config()	// npm i dotenv
const express = require("express")	// npm i express
const path = require("path")	// npm i path
const methodOverride = require("method-override")	// npm i method-override

const port = process.env.PORT
const swaggerPath = process.env.SWAGGER_DOCS
const express = require("express")
const mongodbConfig = require("./utils/mongodb.config")

const builderRoutes = require("./routes/builder.routes")

app.use()
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(methodOverride("_method"))

// RUTAS
// SWAGGER
app.use(
	process.env.SWAGGER_DOCS,
	swaggerUI.serve,
	swaggerUI.setup(specs)
)

// RAÍZ
app.get("/", (req, res) => res.redirect("/pcbuilder"))
// RUTAS REST
app.use("/pcbuilder", builderRoutes)
app.get(/.*/, (req, res) => res.redirect("/"))

// LEVANTAR SERVER
app.listen(port, async () => {
	console.log(`http://localhost:${port}`)
	console.log(`SWAGGER > http://localhost:${port}${swaggerPath}`)
	try {
		await mongodbConfig.conexMongoDB()
			.then(() => {
				console.log("Conexión con MongoDB !!!")
			})
			.catch((err) => {
				console.log(`Error al conectar con MongoDB. Desc: ${err}`)
				process.exit(0)
			})
	} catch (error) {
		console.log(`Error al conectar con MongoDB. Desc: ${error}`)
		process.exit(0)
	}
})