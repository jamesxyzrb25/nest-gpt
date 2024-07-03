import { IsInt, IsOptional, IsString } from "class-validator";

export class ProsConsDiscusserDto{
    @IsString()
    readonly prompt: string;

    /* @IsInt()
    @IsOptional()
    readonly maxTokens?: number; */
}