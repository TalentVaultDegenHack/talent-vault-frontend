import { api } from "@/lib/axios.ts";
import { AxiosResponse } from 'axios';
import { SkillDto } from "@/features/skills/dto/skill.dto.ts";
import {ApplicationInput} from "@/features/skills/dto/application.input.ts";


class ApplicationService {
    async sendApplication(application: ApplicationInput): Promise<AxiosResponse<SkillDto[]>> {
        const result = await api.post('/skills/application/send',  application);
        return result;
    }

    async getApplication(id: number) {
        const result = await api.get('/skills/application/' + id);
        return result;
    }

    async pendingApplication() {
        const result = await api.get('/skills/application/pending');
        return result;
    }

    async declineApplication(id: number) {
        const result = await api.put(`/skills/application/${id}/decline`);
        return result;
    }

    async approveApplication(id: number, value: number, mentorValue: number, mentorCooperation: number) {
        const result = await api.put(`/skills/application/${id}/approve`, {
            value, mentorValue, mentorCooperation,
        });
        return result;
    }

}

export const applicationService = new ApplicationService();