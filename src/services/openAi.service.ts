import { httpService } from '../API/http.service'

export const openAiService = {
   getCompletion: async (data: string): Promise<any> => {
      const prompt = {
         prompt: data,
      }
      return (await httpService.post('open/', prompt)).data
   },
}
