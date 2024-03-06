import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

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

  async findAll() {
    return this.prisma.client.findMany();
  }

  async findOne(id: number) {
    return this.prisma.client.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
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

  async remove(id: number) {
    return this.prisma.client.delete({
      where: {
        id,
      },
    });
  }
}
