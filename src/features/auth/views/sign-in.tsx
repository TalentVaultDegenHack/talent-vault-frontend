import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {tryit} from "radash";
import {authService} from "@/features/auth/services/auth.ts";

type FormValues = {
    username: string;
    password: string;
}

export const SignIn = () => {
    const {
        register,
        handleSubmit,
    } = useForm<FormValues>({});
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const [err] = await tryit(authService.signIn)(data);

        if(err) {
            console.log('ERROR', err);
            return;
        }

        navigate('/')
    }

    return (
        <>
            <div className="relative min-h-screen bg-gray-50">
                <div className="absolute inset-0 block h-full w-full bg-[url('/img/bg.png')] bg-cover bg-no-repeat opacity-40"></div>
                <div className="relative z-10 flex h-screen items-center justify-center">
                    <div className="w-full max-w-5xl">
                        <div className="rounded-md bg-white/80 shadow backdrop-blur-lg">
                            <div className="px-6 py-6 sm:px-8">
                                <div className="flex w-5/12 flex-col gap-y-3">
                                    <div className="flex flex-col gap-y-3">
                                        <h1 className="text-3xl font-bold capitalize text-gray-800">Welcome back</h1>
                                        <span className="text-gray-600">We're happy to have you with us.</span>

                                        <div className="mt-5">
                                            <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
                                                <div className="flex flex-col gap-y-1">
                                                    <label className="text-sm font-medium">Username</label>
                                                    <input
                                                        type="text"
                                                        {...register('username')}
                                                        className="rounded border border-gray-300 px-2 py-2 text-sm shadow-sm"
                                                    />
                                                </div>

                                                <div className="flex flex-col gap-y-1">
                                                    <label className="text-sm font-medium">Password</label>
                                                    <input
                                                        type="password"
                                                        {...register('password')}
                                                        className="rounded border border-gray-300 px-2 py-2 text-sm shadow-sm"
                                                    />
                                                </div>

                                                <button className="rounded bg-indigo-600 py-4 text-sm font-medium text-white">
                                                    Sign in
                                                </button>
                                            </form>

                                            <div className="mt-6">
                                                <p className="text-sm text-gray-800">
                                                    Don't have an account?{" "}
                                                    <Link to="/sign-up" className="text-indigo-600 underline">
                                                        Sign up
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
