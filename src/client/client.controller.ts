import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientCreateDto } from './dtos/client-create-dto';
import { ClientUpdateDto } from './dtos/client-update-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientFetchAllDto } from './dtos/client-fetch-dto';

@Controller('api/v1/clients')
@ApiTags('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'List of clients' })
  @ApiOperation({
    summary: 'Get clients',
    description: 'Get all sessions summarized.',
  })
  async findAll(@Body() dto: ClientFetchAllDto) {
    return this.clientService.findAll(dto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Client found' })
  @ApiOperation({
    summary: 'Get client',
    description: 'Retrieve the result data of a client.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Client created' })
  @ApiOperation({
    summary: 'Create a client',
    description: 'Submission of the necessary data to create a client.',
  })
  async create(@Body() dto: ClientCreateDto) {
    return this.clientService.create(dto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Session updated' })
  @ApiOperation({
    summary: 'Update a client',
    description: 'Submission of the necessary data to update a client.',
  })
  async update(
    @Body() dto: ClientUpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.clientService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a client',
    description: 'Delete a client by its ID.',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.remove(id);
  }
}
