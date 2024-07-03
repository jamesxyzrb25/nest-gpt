import OpenAI from "openai";
import * as fs from 'fs';

import { downloadBase64ImageAsPng, downloadImageaAsPng } from "src/helpers/download-image-as-png";

interface Options{
    baseImage: string;
}

export const imageVariationUseCase = async(openai: OpenAI, options: Options)=>{
    const {baseImage} = options;

    const pngImagePath = await downloadImageaAsPng(baseImage, true);
    const response = await openai.images.createVariation({
        model: 'dall-e-2',
        image: fs.createReadStream(pngImagePath),
        n: 1,
        size: '1024x1024',
        response_format: 'url'
    })

    const fileName = await downloadImageaAsPng(response.data[0].url);
    const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`
    return {
        url: url,
        openAIUrl: response.data[0].url,
        revised_prompt: response.data[0].revised_prompt
    }
}