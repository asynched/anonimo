import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name)

  use(req: Request, res: Response, next: (error?: any) => void) {
    const start = Date.now()

    res.on('finish', () => {
      const end = Date.now()
      const total = end - start

      const message = `${req.method} ${req.url} ${res.statusCode} (ip: ${req.ip} - time: ${total}ms)`

      if (res.statusCode >= 400) {
        this.logger.error(message)
      } else {
        this.logger.log(message)
      }
    })

    return next()
  }
}
