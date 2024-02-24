import { Injectable } from '@nestjs/common';
import { ortographyCheckUseCase } from './use-cases/ortography.use-case';
import { OrtographyDto } from './dtos/ortography.dto';
import OpenAI from 'openai';

@Injectable()
export class GptService {
    private openai = new OpenAI({
        apiKey: process.env.OPEN_API_KEY,
    })
    //Solo va a llamar casos de uso
    async ortographyCheck(ortographyDto:OrtographyDto){
        return await ortographyCheckUseCase(this.openai,{
            prompt: ortographyDto.prompt
        });
    }
}
