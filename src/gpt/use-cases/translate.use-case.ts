import OpenAI from "openai";

interface Options {
    prompt: string;
    lang: string;
  }

  export const translateUseCase = async (openai: OpenAI, { prompt, lang }: Options) => {
    //const {prompt} = options;
    console.log("Prompt: ",prompt);
    const completion = await openai.chat.completions.create({
        messages: [
            { 
            role: "system", 
            content: `
            Traduce el siguiente texto al idioma ${lang}:${ prompt }
            `
         },
         {
            role: 'user',
            content: prompt,
         }
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.3,
        max_tokens: 350
      });
      
      console.log(completion);
      //const jsonResponse = JSON.parse(completion.choices[0].message.content);
      return completion.choices[0].message;
  }