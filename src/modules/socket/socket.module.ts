import { Module } from '@nestjs/common';
import { SocketGateway } from './socket';
import { SocketController } from './socket.controller';
import { SocketService } from './socket.service';

@Module({
  providers: [SocketService, SocketGateway],
  controllers: [SocketController],
})
export class SocketModule {}
