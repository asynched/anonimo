import { join } from 'path'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AuthModule } from '@/auth/auth.module'
import { PrismaModule } from '@/prisma/prisma.module'
import { StorageModule } from '@/storage/storage.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { PostsModule } from '@/posts/posts.module'
import { LoggerMiddleware } from '@/middlewares/logger.middleware'
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    StorageModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    PostsModule,
    UsersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
