import { IsString } from "class-validator";

export class TranslateDto{
    @IsString()
    readonly prompt: string;
    lang: string; // Obligatoria
}