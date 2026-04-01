export const EMAIL_PATTERN: RegExp = new RegExp(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,6})+$/)

export const PASSWORD_PATTERN: RegExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/)
