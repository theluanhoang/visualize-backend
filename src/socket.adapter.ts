import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';

export class SocketAdapter extends IoAdapter {
  createIOServer(
    port: number,
    options?: ServerOptions & {
      namespace?: string;
      server?: Server;
    },
  ) {
    const server = super.createIOServer(port, { ...options, cors: true });
    return server;
  }
}
