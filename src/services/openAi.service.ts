import axios from 'axios';
import { httpService } from '../API/http.service';


class OpenAIService {
    //   async getOpenAIData() {
    //     try {
    //       const response = await httpService.get('/openai');
    //       return response.data;
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }

    //   async getOpenAIDataById(id: string) {
    //     try {
    //       const response = await httpService.get(`/openai/${id}`);
    //       return response.data;
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }

    //   async createOpenAIData(data: any) {
    //     try {
    //       const response = await httpService.post('/openai', data);
    //       return response.data;
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }

    //   async updateOpenAIData(id: string, data: any) {
    //     try {
    //       const response = await httpService.put(`/openai/${id}`, data);
    //       return response.data;
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }

    //   async deleteOpenAIData(id: string) {
    //     try {
    //       const response = await httpService.delete(`/openai/${id}`);
    //       return response.data;
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }

    async getCompletion(data: any) {
        try {
            const response = await httpService.post('/openai', data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export const openaiService = new OpenAIService();
