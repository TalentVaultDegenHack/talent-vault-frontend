import {PageHeading} from "@/components/ui/page-heading.tsx";
import {useEffect, useState} from "react";
import {SkillDto} from "@/features/skills/dto/skill.dto.ts";
import {skillService} from "@/features/skills/services/skill.service.ts";
import {mentorService} from "@/features/skills/services/mentor.service.ts";
import "react-range-slider-input/dist/style.css";
import {ApplicationInput} from "@/features/skills/dto/application.input.ts";
import {applicationService} from "@/features/skills/services/application.service.ts";
import {Range} from "react-range";
import {MentorDto} from "@/features/skills/dto/mentor.dto.ts";

export const Requests = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isBusy, setBusy] = useState(true);
    const [skills, setSkills] = useState<SkillDto[]>([]);
    const [selectedSkill, setSelectedSkill] = useState<number>(0);
    const [selectedMentor, setSelectedMentor] = useState<string>("");
    const [mentors, setMentors] = useState<MentorDto[]>([]);
    const [requestedValue, setRequestedValue] = useState(50);

    useEffect(() => {
        async function fetchData() {
            const result = await skillService.skillsList();
            setSkills(result.data);
            const mentors = await mentorService.mentorList();
            setMentors(mentors.data);
            setBusy(false);
        }
        fetchData();
    }, []);

    const sendApplication = async () => {
        const application: ApplicationInput = {
            skill: {
                id: Number(selectedSkill),
                requestedValue: Number(requestedValue),
            },
            mentorId: selectedMentor,
        }

        await applicationService.sendApplication(application);
    }

    // @ts-ignore
    return <>
        <PageHeading title="Request" />

        <div className="px-8">
            <div className="rounded-md bg-white/80 shadow backdrop-blur-lg">
                <div className="px-6 py-3 sm:px-8">
                    <label htmlFor="mentors" className="block text-sm font-medium leading-6 text-gray-900">
                        Evaluator
                    </label>
                    <select
                        id="mentors"
                        name="mentors"
                        defaultValue={""}
                        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={selectedMentor} // ...force the select's value to match the state variable...
                        onChange={e => setSelectedMentor(e.target.value)}
                    >
                        <option value={""} disabled>Select a evaluator</option>
                        {mentors.map((value) => {
                            return <option value={value.id}>{value.firstName} {value.lastName} - {value.username}</option>
                        })}
                    </select>
                </div>
                <div className="px-6 py-3 sm:px-8">
                    <label htmlFor="skill" className="block text-sm font-medium leading-6 text-gray-900">
                        Skill
                    </label>
                    <select
                        id="skill"
                        name="skill"
                        defaultValue={0}
                        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={selectedSkill} // ...force the select's value to match the state variable...
                        onChange={e => setSelectedSkill(e.target.value as any)}
                    >
                        <option value={0} disabled>Select a skill</option>
                        {skills.map((value) => {
                            return <option value={value.id}>{value.name}</option>
                        })}
                    </select>
                </div>
                <div className="px-6 py-4 sm:px-8 text-center text-lg">
                    Take the next step in your personal development journey by conducting a simple self-evaluation. <br />
                    Use the slider with our five-tiered skill assessment scale. <strong>Be honest* - it’s about trust.</strong>
                </div>
                <div className="px-6 py-4 sm:px-8">
                    <div className={"text-3xl pb-3 font-bold mb-6"}>Skills assessment</div>
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
                                    values={[requestedValue]}
                                    onChange={(values) => setRequestedValue(values[0])}
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
                <div className="px-6 py-5 sm:px-8 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="opacity-50">
                            The evaluator will have a chance to move the slider to match the way they perceive your skill level. We will use our algorithm to to calculate the final skill score.
                        </div>
                        <div className="text-right">
                            <button className="rounded bg-indigo-600 py-4 px-4 text-sm font-medium text-white" onClick={sendApplication}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}