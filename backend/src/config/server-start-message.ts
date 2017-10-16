import * as colors from 'colors';

export default (hostname: string, port: number, env: string) => {
    const endpoint = colors.bold.blue(`http://${hostname}:${port}/`)
    const environment = colors.bold.green(env)

    return `
Server is listening on the endpoint ${endpoint}
Running in ${environment} environement mode.

Please consider serving through https proxy on production for security purposes.
`
}