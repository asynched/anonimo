import { Injectable } from '@nestjs/common'
import { join } from 'node:path'
import { writeFile, readFile, mkdir, stat } from 'node:fs/promises'

const rootPath = join(__dirname, '..', '..', 'uploads')

@Injectable()
export class StorageService {
  async upload(folder: string, filename: string, buffer: Buffer) {
    const folderExists = await stat(folder).catch(() => false)

    if (!folderExists) {
      await mkdir(join(rootPath, folder), { recursive: true })
    }

    const fullPath = join(rootPath, folder, filename)
    const relativePath = join(folder, filename)

    await writeFile(fullPath, buffer)

    return {
      fullPath,
      relativePath,
    }
  }

  async download(folder: string, filename: string) {
    const fullPath = join(rootPath, folder, filename)
    const relativePath = join(folder, filename)

    const buffer = await readFile(fullPath)

    return {
      fullPath,
      relativePath,
      buffer,
    }
  }
}
