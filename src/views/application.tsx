import {PageHeading} from "@/components/ui/page-heading.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {applicationService} from "@/features/skills/services/application.service.ts";
import {Range} from "react-range";
import {SkillText} from "@/components/ui/skill-text.tsx";

export const Application = () => {
    const { id } = useParams();
    const [ isBusy, setIsBusy ] = useState(true);

    const [value, setValue] = useState(50);
    const [mentorValue, setMentorValue] = useState(50);
    const [mentorCooperation, setMentorCooperation] = useState(50);
    const [application, setApplication] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const app = await applicationService.getApplication(id as unknown as number);
            setApplication(app.data);
            setIsBusy(false);
        }
        fetchData();
    }, [id]);

    const accept = async () => {
        // @ts-ignore
        await applicationService.approveApplication(application.id, value, mentorValue, mentorCooperation);
        navigate("/evaluator");
    };
    const decline = async () => {
        // @ts-ignore
        await applicationService.declineApplication(application.id);
        navigate("/evaluator");
    };


    // @ts-ignore
    return <>
        <PageHeading title="Application" />

        {!isBusy && <>
            <div className="px-8">
                <div className="rounded-md bg-white/80 shadow backdrop-blur-lg">
                    <div className="px-6 py-6 sm:px-8">
                        <div className="flex min-w-0 gap-x-4">
                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${application.user.username}`} alt="" />
                            <div className="min-w-0 flex-auto">
                                <p className="font-semibold leading-6 text-gray-900">{application.user.firstName} {application.user.lastName}</p>
                                <p className="mt-1 truncate leading-5 text-gray-500">{application.user.username}</p>
                            </div>
                        </div>
                        <div className="text-2xl my-5">
                                {application.skill.name} <br />
                                {application.skill.description} <br />
                            Applicant’s self-assessment: : <span className={"text-red-800 text-4xl"}>{application.requestedValue} (<SkillText skillValue={application.requestedValue}></SkillText>)</span>
                        </div>
                    </div>
                    <div className="px-6 py-4 sm:px-8">
                        <div className={"text-3xl pb-3 font-bold mb-6"}>Your assessment:</div>
                        <table className="min-w-full table-fixed">
                            <thead>
                            <tr>
                                <th scope="col" className="px-3 py-3.5 text-center text-3xl font-bold text-gray-900 w-1/6">
                                    Novice
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-center text-3xl font-bold text-gray-900 w-1/6">
                                    Beginner
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-center text-3xl font-boldtext-gray-900 w-1/6">
                                    Intermediate
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-center text-3xl font-bold text-gray-900 w-1/6">
                                    Advanced
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-center text-3xl font-bold text-gray-900 w-1/6">
                                    Expert
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td colSpan={5} className={"py-4"}>
                                    <Range
                                        step={5}
                                        min={0}
                                        max={100}
                                        values={[value]}
                                        onChange={(values) => setValue(values[0])}
                                        renderTrack={({ props, children }) => (
                                            <div
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    height: '6px',
                                                    width: '100%',
                                                    backgroundColor: '#ccc'
                                                }}
                                            >
                                                {children}
                                            </div>
                                        )}
                                        renderThumb={({ props }) => (
                                            <div
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    height: '21px',
                                                    width: '21px',
                                                    borderRadius: '12px',
                                                    backgroundColor: 'blue'
                                                }}
                                            />
                                        )}
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="px-6 py-4 sm:px-8">
                        <div className={"text-3xl pb-3 font-bold mb-6"}>How do you perceive yourself in the verified skill:</div>
                        <table className="min-w-full table-fixed">
                            <thead>
                            <tr>
                                <th scope="col" className="px-3 py-3.5 text-center text-3xl font-bold text-gray-900 w-1/6">
                                    Novice
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-center text-3xl font-bold text-gray-900 w-1/6">
                                    Beginner
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-center text-3xl font-boldtext-gray-900 w-1/6">
                                    Intermediate
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-center text-3xl font-bold text-gray-900 w-1/6">
                                    Advanced
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-center text-3xl font-bold text-gray-900 w-1/6">
                                    Expert
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td colSpan={5} className={"py-4"}>
                                    <Range
                                        step={5}
                                        min={0}
                                        max={100}
                                        values={[mentorValue]}
                                        onChange={(values) => setMentorValue(values[0])}
                                        renderTrack={({ props, children }) => (
                                            <div
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    height: '6px',
                                                    width: '100%',
                                                    backgroundColor: '#ccc'
                                                }}
                                            >
                                                {children}
                                            </div>
                                        )}
                                        renderThumb={({ props }) => (
                                            <div
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    height: '21px',
                                                    width: '21px',
                                                    borderRadius: '12px',
                                                    backgroundColor: 'blue'
                                                }}
                                            />
                                        )}
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="px-6 py-4 sm:px-8">
                        <div className={"text-3xl pb-3 font-bold mb-6"}>What’s the time exposure you have had that allows you to make the assessment?</div>
                        <table className="min-w-full table-fixed">
                            <thead>
                            <tr>
                                <th scope="col" className="px-3 py-3.5 text-center text-3xl font-bold text-gray-900 w-1/6">
                                    Limited
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-center text-3xl font-bold text-gray-900 w-1/6">
                                    Occasional
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-center text-3xl font-boldtext-gray-900 w-1/6">
                                    Moderate
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-center text-3xl font-bold text-gray-900 w-1/6">
                                    Substantial
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-center text-3xl font-bold text-gray-900 w-1/6">
                                    Extensive
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td colSpan={5} className={"py-4"}>
                                    <Range
                                        step={5}
                                        min={0}
                                        max={100}
                                        values={[mentorCooperation]}
                                        onChange={(values) => setMentorCooperation(values[0])}
                                        renderTrack={({ props, children }) => (
                                            <div
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    height: '6px',
                                                    width: '100%',
                                                    backgroundColor: '#ccc'
                                                }}
                                            >
                                                {children}
                                            </div>
                                        )}
                                        renderThumb={({ props }) => (
                                            <div
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    height: '21px',
                                                    width: '21px',
                                                    borderRadius: '12px',
                                                    backgroundColor: 'blue'
                                                }}
                                            />
                                        )}
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="opacity-50">

                            </div>
                            <div className="text-right">
                                <button className="rounded bg-red-500 py-4 px-4 text-sm font-medium text-white mx-4" onClick={decline}>
                                    Decline
                                </button>
                                <button className="rounded bg-indigo-600 py-4 px-4 text-sm font-medium text-white" onClick={accept}>
                                    Accept
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>}
    </>;
}