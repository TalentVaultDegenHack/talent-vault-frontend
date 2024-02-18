import {Link, Outlet} from "react-router-dom";
import {Icon} from "@/components/ui/icon.tsx";

export const RootLayout = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <div className="flex h-screen">
                    <div className="w-2/12 border-r border-gray-200 bg-gradient-to-br from-gray-100 to-white">
                        <div className="px-6 py-4 h-full">
                            <div className="flex flex-col gap-y-4 h-full">
                                <img src="/img/logo-sm.png" alt="TalentVault" className="w-24" />

                                <nav className="mt-6">
                                    <ul className="space-y-2">
                                        <li className="flex gap-x-3 items-center text-gray-800 py-2 px-4 rounded-md transition-colors relative">
                                            <Icon icon="me" className="w-6 h-6" />
                                            <span className="font-medium">My profile</span>
                                            <Link to="/" className="absolute inset-0" />
                                        </li>

                                        <li className="flex gap-x-3 items-center text-gray-800 py-2 px-4 hover:bg-gray-200/60 rounded-md transition-colors relative">
                                            <Icon icon="form" className="w-6 h-6" />
                                            <span className="font-medium">Requests</span>
                                            <Link to="/requests" className="absolute inset-0" />
                                        </li>

                                        <li className="flex gap-x-3 items-center text-gray-800 py-2 px-4 hover:bg-gray-200/60 rounded-md transition-colors relative">
                                            <Icon icon="recruiter" className="w-6 h-6" />
                                            <span className="font-medium">Recruiter Zone</span>
                                            <Link to="/recruiter" className="absolute inset-0" />
                                        </li>

                                        <li className="flex gap-x-3 items-center text-gray-800 py-2 px-4 hover:bg-gray-200/60 rounded-md transition-colors relative">
                                            <Icon icon="pending" className="w-6 h-6" />
                                            <span className="font-medium">Evaluator Zone</span>
                                            <Link to="/evaluator" className="absolute inset-0" />
                                        </li>

                                        <li className="flex gap-x-3 items-center text-gray-800 py-2 px-4 hover:bg-gray-200/60 rounded-md transition-colors relative">
                                            <Icon icon="logout" className="w-6 h-6" />
                                            <span className="font-medium">Logout</span>
                                            <Link to="/logout" className="absolute inset-0" />
                                        </li>
                                    </ul>
                                </nav>

                                <div className="mt-auto">
                                    {/*<div className="px-4 py-4 bg-gray-200/60 rounded flex">*/}
                                    {/*    <div className="flex flex-col text-sm">*/}
                                    {/*        <strong className="leading-none">Kacper Komorowski</strong>*/}
                                    {/*        <span className="text-gray-600">Lorem ipsum.</span>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}