import * as path from "path";
import * as fs from "fs";

import { Injectable, NotFoundException } from '@nestjs/common';
import { ortographyCheckUseCase } from './use-cases/ortography.use-case';
import { OrtographyDto } from './dtos/ortography.dto';
import OpenAI from 'openai';
import { ProsConsDiscusserDto } from './dtos/prosConsDiscusser.dto';
import { prosConsDicusserUseCase } from './use-cases/pros-cons-discusser.use-case';
import { prosConsStreamUseCase } from './use-cases/pros-cons-stream.use-case';
import { TranslateDto } from './dtos/translate.dto';
import { translateUseCase } from './use-cases/translate.use-case';
import { TextToAudioDto } from './dtos/text-to-audio.dto';
import { textToAudioUseCase } from './use-cases/text-to-audio.use-case';
import { NotFoundError } from "rxjs";
import { ImageGenerationDto } from "./dtos/image-generation.dto";
import { imageGenerationUseCase } from "./use-cases/image-generation.use-case";
import { audioTotTextUseCase } from "./use-cases/audio-to-text.use-case";
import { AudioToTextDto } from "./dtos/audio-to-text.dto";
import { ImageVariationDto } from "./dtos/image-variation.dto";
import { imageVariationUseCase } from "./use-cases/image-variation.use-case";

@Injectable()
export class GptService {

    private openai = new OpenAI({
        apiKey: process.env.OPEN_API_KEY,
    })
    //Solo va a llamar casos de uso
    async ortographyCheck(ortographyDto: OrtographyDto) {
        return await ortographyCheckUseCase(this.openai, {
            prompt: ortographyDto.prompt
        });
    }

    async prosConsDicusser(prosConsDiscusserDto: ProsConsDiscusserDto) {
        return await prosConsDicusserUseCase(this.openai, {
            prompt: prosConsDiscusserDto.prompt
        });
    }

    async prosConsDicusserStream(prosConsDiscusserDto: ProsConsDiscusserDto) {
        return await prosConsStreamUseCase(this.openai, {
            prompt: prosConsDiscusserDto.prompt
        });
    }

    async translate(translateDto: TranslateDto) {
        return await translateUseCase(this.openai, {
            prompt: translateDto.prompt,
            lang: translateDto.lang
        });
    }

    async textToAudio(textToAudioDto: TextToAudioDto) {
        return await textToAudioUseCase(this.openai, {
            prompt: textToAudioDto.prompt,
            voice: textToAudioDto.voice
        });
    }

    async textToAudioGetter(fileId: string) {
        const filePath = path.resolve(__dirname, '../../generated/audios', `${fileId}.mp3`);
        const wasFound = fs.existsSync(filePath);
        if (!wasFound) throw new NotFoundException(`File ${fileId} not found`);
        return filePath;
    }

    async audioToText(audioFile: Express.Multer.File, audioToTextDto?: AudioToTextDto) {
        const { prompt } = audioToTextDto
        return await audioTotTextUseCase(this.openai, { audioFile, prompt });
    }

    async imageGeration(imageGenerationDto: ImageGenerationDto) {
        return await imageGenerationUseCase(this.openai, { ...imageGenerationDto });
    }

    async imageGenerationGetter(fileName: string) {
        const filePath = path.resolve(__dirname, '../../generated/images', `${fileName}`);
        const wasFound = fs.existsSync(filePath);
        if (!wasFound) throw new NotFoundException(`File ${fileName} not found`);
        return filePath;
    }

    async imageVariation({baseImage}: ImageVariationDto) {
        return imageVariationUseCase(this.openai, {baseImage});
      }

}
