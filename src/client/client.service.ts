import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ClientFetchAllDto } from './dtos/client-fetch-dto';
import { Client } from '@prisma/client';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; locationX: number; locationY: number }) {
    return this.prisma.client.create({
      data: {
        name: data.name,
        locationX: data.locationX,
        locationY: data.locationY,
      },
    });
  }

  async findAll({ routing, limit }: ClientFetchAllDto) {
    const data = await this.prisma.client.findMany({
      take: limit && !routing ? limit : undefined,
    });

    if (!routing) {
      return data;
    }

    return this.calculateShortestRoute(data, limit);
  }

  async findOne(id: string) {
    return this.prisma.client.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    data: { name?: string; locationX?: number; locationY?: number },
  ) {
    const updateData: {
      name?: string;
      locationX?: number;
      locationY?: number;
    } = {};
    if (data.name !== null && data.name !== undefined)
      updateData.name = data.name;
    if (data.locationX !== null && data.locationX !== undefined)
      updateData.locationX = data.locationX;
    if (data.locationY !== null && data.locationY !== undefined)
      updateData.locationY = data.locationY;

    return this.prisma.client.update({
      where: {
        id,
      },
      data: updateData,
    });
  }

  async remove(id: string) {
    return this.prisma.client.delete({
      where: {
        id,
      },
    });
  }

  private calculateShortestRoute(clients: Client[], limit: number): Client[] {
    const virtual = {
      id: '',
      name: 'Center',
      locationX: 0,
      locationY: 0,
    };

    clients.unshift(virtual);

    const matrix = this.calculateMatrix(clients);

    const route = [];
    const visiteds = new Set<string>([virtual.id]);

    let current = virtual;

    while (visiteds.size < clients.length) {
      if (!current) {
        throw new Error('Error while finding the next client');
      }

      let next: Client | undefined = undefined;

      let minDistance = Infinity;

      for (const client of clients) {
        if (visiteds.has(client.id)) {
          continue;
        }

        const distance =
          matrix[clients.indexOf(current)][clients.indexOf(client)];

        if (distance < minDistance) {
          next = client;
          minDistance = distance;
        }
      }

      if (!next) {
        throw new Error('Error while finding the next client');
      }

      current = next;
      route.push(next);
      visiteds.add(next.id);

      if (route.length >= limit) {
        break;
      }
    }

    return route;
  }

  private calculateMatrix(clients: Client[]): number[][] {
    return clients.map((client) =>
      clients.map((otherClient) =>
        Math.sqrt(
          (client.locationX - otherClient.locationX) ** 2 +
            (client.locationY - otherClient.locationY) ** 2,
        ),
      ),
    );
  }
}
