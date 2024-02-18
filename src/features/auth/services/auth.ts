import {api} from "@/lib/axios.ts";
import {SignUpDto} from "@/features/auth/dto/sign-up.ts";
import { AxiosResponse } from 'axios';
import {SignInDto} from "@/features/auth/dto/sign-in.ts";
import {tryit} from "radash";
import {userSignal} from "@/features/auth/signals/user.ts";

class AuthService {
    async signUp(data: SignUpDto): Promise<AxiosResponse<any, any>> {
        const result = await api.post('/auth/register', data);

        return result;
    }

    async signIn(data: SignInDto): Promise<AxiosResponse<any, any>> {
        const result = await api.post('/auth/login', data);

        if(result && result.data?.access_token) {
            localStorage.setItem('authToken', result.data.access_token);

            const [err, profile] = await tryit(authService.profile)();
            if(!err) {
                userSignal.value = profile.data;
            }
        }

        return result;
    }

    async profile(): Promise<AxiosResponse<any, any>> {
        const result = await api.get('/auth/profile');

        return result;
    }
}

export const authService = new AuthService();