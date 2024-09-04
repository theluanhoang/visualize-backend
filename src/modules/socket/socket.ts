import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';

@UsePipes(new ValidationPipe({ whitelist: true }))
@WebSocketGateway()
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('SocketGateway');

  constructor(private readonly socketsService: SocketService) {}

  async handleDisconnect(socket: Socket) {
    this.logger.log(socket.id, ' disconnected');
  }

  afterInit(server: Server) {
    this.logger.log(server, 'server..............................');
  }

  async handleConnection(socket: Socket) {
    this.logger.log(socket.id, ' connected');
  }

  @SubscribeMessage('input')
  async inputFromClient(socket: Socket) {

  }
}
