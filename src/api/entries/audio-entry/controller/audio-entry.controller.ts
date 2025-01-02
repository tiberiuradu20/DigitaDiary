import { Controller, Post, Body, Get, Param, Delete,Put } from '@nestjs/common';
import { AudioEntryService } from '.././service/audio-entry.service';
import { CreateAudioEntryDto } from '../dto/create-audio-entry.dto';
import { UpdateAudioEntryDto } from '../dto/update-audio-entry.dto';

@Controller('audio-entry')
export class AudioEntryController {
  constructor(private readonly audioEntryService: AudioEntryService) {}

  @Post()
  create(@Body() createAudioEntryDto: CreateAudioEntryDto) {
    return this.audioEntryService.create(createAudioEntryDto.userId, createAudioEntryDto.fileUrl, createAudioEntryDto.duration);
  }

  @Get(':userId')
  findAllByUser(@Param('userId') userId: number) {
    return this.audioEntryService.findAllByUser(Number(userId));
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.audioEntryService.deleteById(Number(id));
  }
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateAudioEntryDto: UpdateAudioEntryDto ) {
      const ID = Number(id)
    return this.audioEntryService.update(ID, updateAudioEntryDto);
  }
}
