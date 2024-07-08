import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MapGateway {
  @WebSocketServer()
  server: Server;

  sendMapUpdate(data: any) {
    console.log('Enviando evento MapUpdate:', data);
    this.server.emit('mapUpdate', data);
  }
}
