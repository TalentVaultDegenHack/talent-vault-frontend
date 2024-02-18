import {UserPublicDto} from "@/features/skills/dto/user.public.dto.ts";

export interface MatchingProfileDto {
    precision: number;
    user: UserPublicDto;
}