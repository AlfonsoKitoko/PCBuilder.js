export const nonEmptyArray = (arr) => {
	return Array.isArray(arr) && arr.length > 0
}

export const nonEmptyArrayValidator = (message) => {
	return [nonEmptyArray, message || "El array no puede estar vacío"]
}