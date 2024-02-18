import {PageHeading} from "@/components/ui/page-heading.tsx";
import {useEffect, useState} from "react";
import {skillService} from "@/features/skills/services/skill.service.ts";
import {SkillDto} from "@/features/skills/dto/skill.dto.ts";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import {SkillText} from "@/components/ui/skill-text.tsx";

export const Dashboard = () => {
    const [mySkills, setMySkills] = useState<any>([]);
    const [mySkillsSummary, setMySkillsSummary] = useState<any>([]);
    const [skills, setSkills] = useState<SkillDto[]>([]);

    useEffect(() => {
        async function fetchData() {
            const result = await skillService.skillsList();
            setSkills(result.data);
            setMySkills((await skillService.mySkill()).data);
            setMySkillsSummary((await skillService.mySkillSummary()).data);
        }
        fetchData();
    }, []);

    const skillInfo = (skillId: number) => {
        const skill = skills.find(i => i.id === skillId);
        if (skill) {
            return <div>
                {skill.name} <br />
                <small>{skill.description}</small>
            </div>
        }
    };

    return <>
        <PageHeading title="My profile" />

        <div className="px-8">
            <div className="rounded-md bg-white/80 shadow backdrop-blur-lg">
                <div className="px-6 py-6 sm:px-8">
                   <div className="text-2xl">Summary</div>

                    <div className="grid grid-cols-2 gap-4 my-7">
                        <div className="text-center">
                            <img className="flex-none rounded-full bg-gray-50 ml-auto mr-auto" src={"https://i.pravatar.cc/300"} alt="" />
                        </div>
                        <div>
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
                                {mySkillsSummary.map((skill) => (
                                    <tr key={skill.skillId}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {skillInfo(skill.skillId)}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" colSpan={5}>
                                            <RangeSlider min={0} max={100} step={5} value={[skill.minValue, skill.maxValue]} disabled={true} />
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                   <div className="text-2xl pt-16">My Skills</div>
                    <table className="min-w-full table-fixed">
                        <thead>
                        <tr>
                            <th scope="col" className="py-3.5 text-xl font-bold text-gray-900 text-left">
                                Skill
                            </th>
                            <th scope="col" className="py-3.5 text-xl font-bold text-gray-900 text-center">
                                Your <br />assessment
                            </th>
                            <th scope="col" className="py-3.5 text-xl font-bold text-gray-900 text-center">
                                Assessment
                            </th>
                            <th scope="col" className="py-3.5 text-xl font-boldtext-gray-900 text-center">
                                Evaluator <br />assessment
                            </th>
                            <th scope="col" className="py-3.5 text-xl font-bold text-gray-900 text-center">
                                Exposure
                            </th>
                            <th scope="col" className="py-3.5 text-xl font-bold text-gray-900 text-left">
                                Author
                            </th>
                            <th scope="col" className="py-3.5 text-xl font-bold text-gray-900 text-left">
                                State
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                            {mySkills.map((obj) => {
                                return <tr>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        {obj.skill.name} <br />
                                        <small className="text-sm">{obj.skill.description}</small>
                                    </td>
                                    <td className="text-center">
                                        {obj.requestedValue} <SkillText skillValue={obj.requestedValue}></SkillText>
                                    </td>
                                    <td className="text-center">
                                        {obj.value} <SkillText skillValue={obj.value}></SkillText>
                                    </td>
                                    <td className="text-center">
                                        {obj.mentorValue} <SkillText skillValue={obj.mentorValue}></SkillText>
                                    </td>
                                    <td className="text-center">
                                        {obj.mentorCooperation}
                                    </td>
                                    <td>{obj.mentor.firstName} {obj.mentor.lastName}</td>
                                    <td>
                                        {obj.state === 1 ? <span className="text-yellow-600">Pending</span> : ""}
                                        {obj.state === 2 ? <span className="text-green-600">Approved</span> : ""}
                                        {obj.state === 3 ? <span className="text-red-800">Declined</span> : ""}
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