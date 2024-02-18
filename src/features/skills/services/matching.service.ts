import { api } from "@/lib/axios.ts";
import { AxiosResponse } from 'axios';
import { SkillDto } from "@/features/skills/dto/skill.dto.ts";
import {MatchingInput} from "@/features/skills/dto/matching.input.ts";
import {MatchingProfileDto} from "@/features/skills/dto/matching.profile.dto.ts";


class MatchingService {
    async profileCount(filters: MatchingInput[]): Promise<AxiosResponse<SkillDto[]>> {
        const result = await api.post('/matching/profiles-count',  { filters  });
        return result;
    }

    async profiles(filters: MatchingInput[], precision: number): Promise<AxiosResponse<MatchingProfileDto[]>> {
        const result = await api.post('/matching/profiles',  { filters, precision  });
        return result;
    }
}

export const matchingService = new MatchingService();