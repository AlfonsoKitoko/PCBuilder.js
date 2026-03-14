exports.success = (res, data = null, message = "OK", status = 200) => {
	return res.status(status).json({
		success: true,
		message,
		data
	})
}

exports.error = (res, message = "Error", status = 400, errors = null) => {
	return res.status(status).json({
		success: false,
		message,
		errors
	})
}