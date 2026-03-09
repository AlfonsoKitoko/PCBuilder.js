export const integerValidator = {
	validator: Number.isInteger,
	message: "{VALUE} no es un número entero positivo (>= 0)"
}

export const positiveIntegerValidator = {
	validator: function (v) {
		return Number.isInteger(v) && v >= 0
	},
	message: "{VALUE} no es un número entero positivo (>= 0)"
}

