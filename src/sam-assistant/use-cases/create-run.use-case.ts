import OpenAI from "openai";

interface Options{
    threadId: string;
    assistantId?: string
}

export const createRunUseCase = async(openai: OpenAI, options:Options)=>{
    const {threadId, assistantId='asst_l7eH6QfkrKUCIMD8HoV2RMBh'} = options;
    
    const run = await openai.beta.threads.runs.create( threadId,{
        assistant_id: assistantId,
        //instruccions: Sobre escribe el asistente
    })


    return run;
}