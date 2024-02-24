import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrtographyDto } from './dtos/ortography.dto';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('ortography-check')
  ortographyCheck(
    @Body() ortographyDto:OrtographyDto
  ){
    return this.gptService.ortographyCheck(ortographyDto);
  }
}
