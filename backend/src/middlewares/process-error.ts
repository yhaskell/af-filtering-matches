import { env } from '../config'

export const devError = (err: Error) => ({
    status: "error",
    message: err.message
})

export const prodError = (err: Error) => ({
    status: "error",
    message: "Server error occured. Administrators has been notified."
})

export default env == "development" ? devError : prodError
