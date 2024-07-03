import { Body, Controller, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrtographyDto } from './dtos/ortography.dto';
import { ProsConsDiscusserDto } from './dtos/prosConsDiscusser.dto';
import { Response } from 'express';
import { TranslateDto } from './dtos/translate.dto';
import { TextToAudioDto } from './dtos/text-to-audio.dto';
import { ImageGenerationDto } from './dtos/image-generation.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer'
import { AudioToTextDto } from './dtos/audio-to-text.dto';
import { ImageVariationDto } from './dtos/image-variation.dto';

@Controller('gpt') 
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('ortography-check')
  ortographyCheck(
    @Body() ortographyDto:OrtographyDto
  ){
    console.log("ortography-check controller");
    return this.gptService.ortographyCheck(ortographyDto);
  }

  @Post('pros-cons-discusser')
  prosConsDicusser(
    @Body() prosConsDiscusserDto: ProsConsDiscusserDto
  ){
    return this.gptService.prosConsDicusser(prosConsDiscusserDto);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDicusserStream(
    @Body() prosConsDiscusserDto: ProsConsDiscusserDto,
    @Res() res: Response
  ){
    const stream = await this.gptService.prosConsDicusserStream(prosConsDiscusserDto);
    res.setHeader('Content-Type','Application/json');
    res.status(HttpStatus.OK);

    for await(const chunk of stream){
        const piece = chunk.choices[0].delta.content || '';
        console.log(piece);
        res.write(piece);
    }
    res.end();
  }

  @Post('translate')
  async translate(
    @Body() translateDto: TranslateDto
  ){
    return this.gptService.translate(translateDto);
  }

  @Post('text-to-audio')
  async textToAudio(
    @Body() textToAudio: TextToAudioDto,
    @Res() res: Response
  ){
    const filePath = await this.gptService.textToAudio(textToAudio);
    res.setHeader('Content-Type','audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);

  }

  @Get('text-to-audio/:fileId')
  async textToAudioGetter(
    @Param('fileId') fileId: string,
    @Res() res: Response
  ){
    const filePath = await this.gptService.textToAudioGetter(fileId);
    res.setHeader('Content-Type','audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath); 

  }

  @Post('audio-to-text')
  @UseInterceptors(
    FileInterceptor('file',{
      storage: diskStorage({
        destination: './generated/uploads',
        filename: (req, file, callback)=>{
          const fileExtension = file.originalname.split('.').pop();
          const fileName = `${new Date().getTime()}.${fileExtension}`;
          return callback(null, fileName);
        }
      })
    })
  )
  async audioTotText(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize:1000*1024*5, message:'File is bigger than 5mb'}),
          new FileTypeValidator({fileType:'audio/*'})
        ]
      })
    ) file: Express.Multer.File,
    @Body() audioToTextDto: AudioToTextDto
  ){
    console.log({file});
    return this.gptService.audioToText(file, audioToTextDto);
  }


  @Post('image-generation')
  async imageGeneration(
    @Body() imageGenerationDto: ImageGenerationDto
  ){
    return this.gptService.imageGeration(imageGenerationDto);
  }

  @Get('image-generation/:fileName')
  async imageGenerationGetter(
    @Param('fileName') fileName: string,
    @Res() res: Response
  ){
    const filePath = await this.gptService.imageGenerationGetter(fileName);
    console.log(filePath);
    //res.setHeader('Content-Type','images/png');
    res.status(HttpStatus.OK);
    res.sendFile(filePath); 
  }

  @Post('image-variation')
  async imageVariation(
    @Body() imageVariationDto: ImageVariationDto
  ){
    return this.gptService.imageVariation(imageVariationDto);
  }

}
