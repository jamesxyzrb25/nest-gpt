import { IsInt, IsOptional, IsString } from "class-validator";

export class OrtographyDto{
    @IsString()
    readonly prompt: string;

    @IsInt()
    @IsOptional()
    readonly maxTokens?: number;
}