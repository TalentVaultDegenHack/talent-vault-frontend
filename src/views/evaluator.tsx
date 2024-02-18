import {PageHeading} from "@/components/ui/page-heading.tsx";
import {useEffect, useState} from "react";
import {skillService} from "@/features/skills/services/skill.service.ts";
import {applicationService} from "@/features/skills/services/application.service.ts";
import {useNavigate} from "react-router-dom";

export const Evaluator = () => {
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const result = await applicationService.pendingApplication();
            setApplications(result.data);
        }
        fetchData();
    }, []);

    const showApplication = (id: number) => {
        navigate("/application/" + id);
    };

    return <>
        <PageHeading title="Evaluator - Pending Application" />

        <div className="px-8">
            <div className="rounded-md bg-white/80 shadow backdrop-blur-lg">
                <div className="px-6 py-6 sm:px-8">
                    <div className={"py-6 mb-6"}>
                        Below you can see all skill-verification requests that await your action.
                        To provide your assessment, please click “Show” and open the request of your choice.
                    </div>
                    <table className="min-w-full divide-y divide-gray-300 table-fixed">
                        <thead>
                        <tr>
                            <th scope="col" className="py-3.5 text-sm text-left font-semibold text-gray-900">
                                REQUESTING USER
                            </th>
                            <th scope="col" className="py-3.5 text-sm text-left font-semibold text-gray-900">
                                SKILL
                            </th>
                            <th scope="col" className="py-3.5 text-sm text-left font-semibold text-gray-900">
                                ACTION
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {applications.map((app) => {
                            return <tr key={app.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                    <div className="flex min-w-0 gap-x-4">
                                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${app.user.username}`} alt="" />
                                        <div className="min-w-0 flex-auto">
                                            <p className="font-semibold leading-6 text-gray-900">{app.user.firstName} {app.user.lastName}</p>
                                            <p className="mt-1 truncate leading-5 text-gray-500">{app.user.username}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {app.skill.name} <br />
                                    <small>{app.skill.description}</small>
                                </td>
                                <td>
                                    <button className="rounded bg-indigo-600 py-2 px-4 text-sm font-medium text-white" onClick={() => {showApplication(app.id)}}>
                                        Show
                                    </button>
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>;
}