import { checkCompatibility } from './compatibility.engine.js'
import { checkPSUPower } from './power.engine.js'

export const validateFullBuild = (build) => {
	const errors = checkCompatibility(build)

	const psuError = checkPSUPower(build)
	if (psuError) errors.push(psuError)

	return {
		isValid: errors.length === 0,
		errors: errors
	}
}