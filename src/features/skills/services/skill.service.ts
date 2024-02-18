import { api } from "@/lib/axios.ts";
import { AxiosResponse } from 'axios';
import { SkillDto } from "@/features/skills/dto/skill.dto.ts";


class SkillService {
    async skillsList(): Promise<AxiosResponse<SkillDto[]>> {
        const result = await api.get('/skills');
        return result;
    }

    async mySkill(): Promise<AxiosResponse<any>> {
        const result = await api.get('/skills/my');
        return result;
    }

    async mySkillSummary(): Promise<AxiosResponse<any>> {
        const result = await api.get('/skills/my/summary');
        return result;
    }

}

export const skillService = new SkillService();