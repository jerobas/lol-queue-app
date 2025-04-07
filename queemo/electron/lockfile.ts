import fs from 'fs'
import path from 'path'

export const getLockFile = () => {
    const filePath = path.join('D:\\Riot Games\\League of Legends\\lockfile')

    if (!fs.existsSync(filePath)) {
        throw new Error('F lockfile')
    }

    const content = fs.readFileSync(filePath, 'utf-8')
    const [name, pid, port, password, protocol] = content.split(':');

    return {
        name,
        pid: Number(pid),
        port: Number(port),
        password,
        protocol
    }
}