import * as path from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { InternalServerErrorException } from "@nestjs/common";


export const downloadImageaAsPng = async (url: string, fullPathFlag: boolean = false) => {
    const resp = await fetch(url);

    if (!resp.ok) {
        throw new InternalServerErrorException('Download image was not posible');
    }

    const folderPath = path.resolve('./', './generated/images/');
    fs.mkdirSync(folderPath, { recursive: true });

    const imageNamePng = `${new Date().getTime()}.png`;
    const buffer = Buffer.from(await resp.arrayBuffer());

    //fs.writeFileSync(`${folderPath}/${imageNamePng}`,buffer);

    const completePath = path.join(folderPath, imageNamePng)
    await sharp(buffer)
        .png()
        .ensureAlpha()
        .toFile(completePath);

    return fullPathFlag ? completePath : imageNamePng;

}

export const downloadBase64ImageAsPng = async (base64Image: string, fullPathFlag: boolean = false) => {

    // Remover encabezado
    base64Image = base64Image.split(';base64,').pop();
    const imageBuffer = Buffer.from(base64Image, 'base64');

    const folderPath = path.resolve('./', './generated/images/');
    fs.mkdirSync(folderPath, { recursive: true });

    const imageNamePng = `${new Date().getTime()}-64.png`;

    const completePath = path.join(folderPath, imageNamePng);
    // Transformar a RGBA, png // Así lo espera OpenAI
    await sharp(imageBuffer)
        .png()
        .ensureAlpha()
        .toFile(path.join(folderPath, imageNamePng));

    return fullPathFlag ? completePath : imageNamePng;

}