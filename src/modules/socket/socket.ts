import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { spawn } from 'child_process';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('SocketGateway');

  afterInit(server: any) {
    this.logger.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    client.emit('output', 'Connected to server\r\n');
    client.emit('output', 'Terminal connected\r\n');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('input')
  handleInput(client: Socket, payload: string): void {
    const child = spawn(payload, [], { shell: true });

    child.stdout.on('data', (data) => {
      const output = data.toString();
      client.emit('output', output);
    });

    child.stderr.on('data', (data) => {
      const errorOutput = data.toString();
      client.emit('error', errorOutput);
    });

    child.on('close', (code) => {
      this.logger.log(`Process exited with code ${code}\r\n`);
    });
  }
}
