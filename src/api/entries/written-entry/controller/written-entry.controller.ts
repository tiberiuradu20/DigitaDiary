import { Controller, Post, Body, Get, Param, Delete,Put } from '@nestjs/common';
import { WrittenEntryService } from '.././service/written-entry.service';
import { CreateWrittenEntryDto } from '../dto/create-written-entry.dto';
import { UpdateWrittenEntryDto } from '../dto/update-written-entry.dto';

@Controller('written-entry')
export class WrittenEntryController {
  constructor(private readonly writtenEntryService: WrittenEntryService) {}

  @Post()
  create(@Body() createWrittenEntryDto: CreateWrittenEntryDto) {
    console.log('Cererea a ajuns n WrittenEntryController:', createWrittenEntryDto);
    return this.writtenEntryService.create(createWrittenEntryDto.userId, createWrittenEntryDto.content);
  }

  @Get(':userId')
  findAllByUser(@Param('userId') userId: number) {
    return this.writtenEntryService.findAllByUser(Number(userId));
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.writtenEntryService.deleteById(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateWrittenEntryDto: UpdateWrittenEntryDto ) {
      const numericId = Number(id);
    return this.writtenEntryService.update(numericId, updateWrittenEntryDto);
  }

}
