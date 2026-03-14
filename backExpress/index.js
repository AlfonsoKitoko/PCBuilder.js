// --> models > services > controller > routes

// npm i dotenv express path method-override cors mongoose ejs

require("dotenv").config()	// npm i dotenv

const express = require("express")	// npm i express
const path = require("path")	// npm i path
const methodOverride = require("method-override")	// npm i method-override

const swaggerUI = require("swagger-ui-express")	// npm i swagger-jsdoc swagger-ui-express
const swaggerSpecs = require("./config/swagger.config")

const { conexMongoDB } = require("./config/mongodb.config")

const builderRoutes = require("./routes/builder.routes")

const app = express()

const PORT = process.env.PORT
const swaggerPath = process.env.SWAGGER_DOCS

//////////////////////////////////////////////////////
// ++ MIDDLEWARES ++
//////////////////////////////////////////////////////

app.use(express.json())

app.use(methodOverride("_method"))

app.use(express.static(path.join(__dirname, "public")))

//////////////////////////////////////////////////////
// ++ VIEW ENGINE ++
//////////////////////////////////////////////////////

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

//////////////////////////////////////////////////////
// ++ SWAGGER ++
//////////////////////////////////////////////////////

app.use(
	swaggerPath,
	swaggerUI.serve,
	swaggerUI.setup(swaggerSpecs)
)

//////////////////////////////////////////////////////
// ++ ROUTES ++
//////////////////////////////////////////////////////

app.get("/", (req, res) => res.redirect("/pcbuilder"))

app.use("/pcbuilder", builderRoutes)

app.get(/.*/, (req, res) => res.redirect("/"))

//////////////////////////////////////////////////////
// ++ START SERVER ++
//////////////////////////////////////////////////////

try {
	await conexMongoDB()

	app.listen(PORT, () => {
		console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
		console.log(`Servitor running @ http://localhost:${PORT}`)
		console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
		console.log(`Swagger running @ http://localhost:${PORT}${swaggerPath}`)
		console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

	})

} catch (err) {

	console.log("Error starting Servitor", err)

	process.exit(1)

}