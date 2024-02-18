import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {authService} from "@/features/auth/services/auth.ts";
import {tryit} from "radash";

type FormValues = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
}

export const SignUp = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
    } = useForm<FormValues>({

    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const {
            email,
            password,
            username,
            firstName,
            lastName,
            address
        } = data;

        const [err, result] = await tryit(authService.signUp)({
            email,
            username,
            password,
            firstName,
            lastName,
            address,
        });

        if(err) {
            console.log('ERROR', err);
            return;
        }

        // redirect to login page
        navigate("/sign-in");

        console.log(result.data);
    }

    return (
        <>
            <div className="relative min-h-screen bg-gray-50">
                <div className="absolute inset-0 block h-full w-full bg-[url('/img/bg.png')] bg-cover bg-no-repeat opacity-40"></div>
                <div className="relative z-10 flex h-screen items-center justify-center">
                    <div className="w-full max-w-5xl">
                        <div className="rounded-md bg-white/80 shadow backdrop-blur-lg">
                            <div className="px-6 py-6 sm:px-8">
                                <div className="flex gap-x-6">
                                    <div className="flex w-5/12 flex-col gap-y-3">
                                        <h1 className="text-3xl font-bold capitalize text-gray-800">Get started now</h1>
                                        <span className="text-gray-600">
                                            You're welcomed to create an account and join our services.
                                        </span>

                                        <div className="mt-5">
                                            <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
                                                <div className="flex gap-x-4">
                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="text-sm font-medium">First name</label>
                                                        <input
                                                            type="text"
                                                            {...register("firstName")}
                                                            className="w-full rounded border border-gray-300 px-2 py-2 shadow-sm text-sm"
                                                        />
                                                    </div>

                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="text-sm font-medium">Last name</label>
                                                        <input
                                                            type="text"
                                                            {...register("lastName")}
                                                            className="w-full rounded border border-gray-300 px-2 py-2 shadow-sm text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-y-1">
                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="text-sm font-medium">Username</label>
                                                        <input
                                                            type="text"
                                                            {...register("username")}
                                                            className="w-full rounded border border-gray-300 px-2 py-2 shadow-sm text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-y-1">
                                                    <label className="text-sm font-medium">E-mail address</label>
                                                    <input
                                                        type="email"
                                                        {...register("email")}
                                                        className="w-full rounded border border-gray-300 px-2 py-2 shadow-sm text-sm"
                                                    />
                                                </div>

                                                <div className="flex flex-col gap-y-1">
                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="text-sm font-medium">Tezos Address</label>
                                                        <input
                                                            type="text"
                                                            {...register("address")}
                                                            className="w-full rounded border border-gray-300 px-2 py-2 shadow-sm text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex gap-x-4">
                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="text-sm font-medium">Password</label>
                                                        <input
                                                            type="password"
                                                            {...register("password")}
                                                            className="w-full rounded border border-gray-300 px-2 py-2 shadow-sm text-sm"
                                                        />
                                                    </div>

                                                    <div className="flex flex-col gap-y-1">
                                                        <label className="text-sm font-medium">Confirm password</label>
                                                        <input
                                                            type="password"
                                                            {...register("confirmPassword")}
                                                            className="w-full rounded border border-gray-300 px-2 py-2 shadow-sm text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="relative flex items-start">
                                                    <div className="flex h-6 items-center">
                                                        <input
                                                            id="policy"
                                                            name="policy"
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                    </div>
                                                    <div className="ml-3 text-sm leading-6">
                                                        <label htmlFor="policy" className="text-gray-800">
                                                            I've read and agree to the{" "}
                                                            <a href="#" className="text-indigo-600 underline">
                                                                privacy policy
                                                            </a>
                                                        </label>
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="rounded bg-indigo-600 py-4 text-sm font-medium text-white"
                                                >
                                                    Sign up
                                                </button>
                                            </form>

                                            <div className="mt-6">
                                                <p className="text-sm text-gray-800">
                                                    Already have an account?{" "}
                                                    <Link to="/sign-in" className="text-indigo-600 underline">
                                                        Sign in
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 rounded-md bg-gradient-to-r from-gray-200/70 via-white/50 to-gray-200/70 p-px">
                                        <div className="relative h-full w-full overflow-hidden rounded-md bg-white shadow">
                                            <div className="absolute inset-0 bg-gradient-to-bl from-pink-400/60 via-blue-400/60 to-indigo-600/60"></div>
                                            <img src="/img/img.webp" alt="Lorem" className="object-cover opacity-70" />
                                            <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent"></div>

                                            <div className="absolute inset-0">
                                                <div className="px-6 py-8">
                                                    <div className="flex flex-col">
                                                        <h2 className="font-semibold text-2xl leading-6 tracking-tight text-gray-900">Welcome to the dawn of a new era in recruitment and talent management.</h2>
                                                    </div>
                                                </div>
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
