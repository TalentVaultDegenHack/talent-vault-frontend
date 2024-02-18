import { api } from "@/lib/axios.ts";
import { AxiosResponse } from 'axios';
import {MentorDto} from "@/features/skills/dto/mentor.dto.ts";


class MentorService {
    async mentorList(): Promise<AxiosResponse<MentorDto[]>> {
        const result = await api.get('/skills/mentors');
        return result;
    }
}

export const mentorService = new MentorService();