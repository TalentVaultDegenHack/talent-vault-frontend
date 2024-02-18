import {PageHeading} from "@/components/ui/page-heading.tsx";
import {useEffect, useState} from "react";
import {skillService} from "@/features/skills/services/skill.service.ts";
import {SkillDto} from "@/features/skills/dto/skill.dto.ts";
import {MatchingInput} from "@/features/skills/dto/matching.input.ts";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import {matchingService} from "@/features/skills/services/matching.service.ts";
import {MatchingProfileDto} from "@/features/skills/dto/matching.profile.dto.ts";

export const Recruiter = () => {
    const [isBusy, setBusy] = useState(true);
    const [skills, setSkills] = useState<SkillDto[]>([]);
    const [selectedSkill, setSelectedSkill] = useState<number>(0);
    const [selectedSkills, setSelectedSkills] = useState<MatchingInput[]>([]);

    const [precision, setPrecision] = useState(70);
    const [matchingProfileCount, setMatchingProfileCount] = useState(-1);
    const [count, setCount] = useState(0);
    const [profiles, setProfiles] = useState<MatchingProfileDto[]>();

    useEffect(() => {
        async function fetchData() {
            const result = await skillService.skillsList();
            setSkills(result.data);
            setBusy(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
        search();
    }, [selectedSkills]);

    const addSkill = () =>
    {
        if (Number(selectedSkill) > 0) {
            if (!selectedSkills.some(i => i.skillId === Number(selectedSkill))) {
                const obj: MatchingInput = {
                    from: 50,
                    to: 60,
                    skillId: Number(selectedSkill)
                };
                setSelectedSkills([...selectedSkills, obj]);
            }
        }
    }

    const skillTd = (skillId: number) => {
        const skill = skills.find(i => i.id === skillId);
        if (skill) {
            return <div>
                {skill.name} <br />
                <small>{skill.description}</small>
            </div>
        }
    };

    const search = async () => {
        const matching = (await matchingService.profileCount(selectedSkills)).data[Number(precision)];
        setMatchingProfileCount(matching);
    };

    const changePrecision = (precision: number) => {
        setPrecision(Number(precision));
        // refresh
        search();
    };

    const changeSlider = (array: number[], s: MatchingInput) => {
        s.to = array[1];
        s.from = array[0];
        setCount(count + 1);
        search();
    }

    const purchaseAccess = async () => {
        setProfiles((await matchingService.profiles(selectedSkills, precision)).data);
    };


    return <>
        <PageHeading title="Recrutier Zone" />

        <div className="px-8">
            <div className="rounded-md bg-white/80 shadow backdrop-blur-lg">
                <div className="px-6 py-6 sm:px-8">
                    <div className="grid grid-flow-col auto-cols-max gap-4 flex items-center">
                        <div>
                            <h2>
                                Choose the skills you are interested in
                            </h2>
                        </div>
                        <div>
                            <select
                                id="skill"
                                name="skill"
                                defaultValue={0}
                                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={selectedSkill} // ...force the select's value to match the state variable...
                                onChange={e => setSelectedSkill(e.target.value)}
                            >
                                <option value={0} disabled>Select a skill</option>
                                {skills.map((value) => {
                                    return <option value={value.id}>{value.name}</option>
                                })}
                            </select>
                        </div>
                        <div>
                            <button className="rounded bg-indigo-600 py-2 px-4 text-sm font-medium text-white" onClick={addSkill}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
                <div>

                </div>
                {selectedSkills.length > 0 && <>
                    <div className="px-6 py-6 sm:px-8">
                        <table className="min-w-full divide-y divide-gray-300 table-fixed">
                            <thead>
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 w-1/6">
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 w-1/6">
                                    Novice
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 w-1/6">
                                    Beginner
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 w-1/6">
                                    Intermediate
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 w-1/6">
                                    Advanced
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 w-1/6">
                                    Expert
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {selectedSkills.map((skill) => (
                                <tr key={skill.skillId}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        {skillTd(skill.skillId)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" colSpan={5}>
                                        <RangeSlider min={0} max={100} step={5} value={[skill.from, skill.to]} onInput={(a) => {changeSlider(a, skill)}} />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/*<div className="px-6 py-6 sm:px-8 text-right">*/}
                    {/*    <button className="rounded bg-indigo-600 py-4 px-4 text-sm font-medium text-white" onClick={search}>*/}
                    {/*        Search*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </>}

                {selectedSkills.length > 0 && <div className="px-6 py-6 sm:px-8 text-center">
                    WE HAVE
                    <span className={"text-red-800 text-2xl"}>{" "}{matchingProfileCount === -1 ? "???" : matchingProfileCount}{" "}</span>
                    PROFILES WITH AT LEAST <input
                    type="number"
                    name="precision"
                    id="precision"
                    step={5}
                    min={0}
                    max={100}
                    value={precision}
                    onChange={(e) => {changePrecision(e.target.value)}}
                    className="inline rounded-md border-0 py-3 mx-3 text-red-800 shadow-sm ring-2 ring-inset ring-red-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-2xl sm:leading-6"
                /> MATCH
                </div>}

                {selectedSkills.length > 0 && <div className="px-6 py-6 sm:px-8 text-right">
                    <button className="rounded bg-indigo-600 py-2 px-4 text-sm font-medium text-white" onClick={purchaseAccess}>
                        PURCHASE ACCESS (FREE)
                    </button>
                </div>}

                <div>

                </div>
                {profiles && profiles.length &&
                    <div className="px-6 py-6 sm:px-8 overflow-auto">
                    <div className={"text-3xl"}>Talents</div>
                    <ul role="list" className="divide-y divide-gray-100">
                        {profiles && profiles.map((person) => (
                            <li key={person.user.id} className="flex justify-between gap-x-6 py-5">
                                <div className="flex min-w-0 gap-x-4">
                                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${person.user.username}`} alt="" />
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{person.user.firstName} {person.user.lastName}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.user.username}</p>
                                    </div>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <p className="text-2xl leading-6 text-green-600">{person.precision}%</p>
                                    <p>
                                        <button className="rounded bg-indigo-600 my-1 py-1 px-1 text-sm font-medium text-white" onClick={addSkill}>
                                            See details
                                        </button>
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                }
            </div>
        </div>
    </>;
}