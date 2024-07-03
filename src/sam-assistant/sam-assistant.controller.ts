import { Body, Controller, Post, assignMetadata } from '@nestjs/common';
import { SamAssistantService } from './sam-assistant.service';
import { QuestionDto } from './dtos/question.dto';

@Controller('sam-assistant')
export class SamAssistantController {
  constructor(private readonly samAssistantService: SamAssistantService) {

  }

  @Post('create-thread')
  async createThread(){
    return this.samAssistantService.createThread();
  }

  @Post('user-question')
  async userQuestion(
    @Body() questionDto:QuestionDto
  ){
    return this.samAssistantService.userQuestion(questionDto);
  }
}
