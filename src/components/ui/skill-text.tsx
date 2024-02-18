interface Props {
    skillValue: number;
}

export const SkillText = ({ skillValue }: Props) => {
    return <>
        {skillValue < 20 && skillValue >= 1 ? <span className="text-green-200">Novice</span> : ""}
        {skillValue < 40 && skillValue >= 20 ? <span className="text-green-500">Beginner</span> : ""}
        {skillValue < 60 && skillValue >= 40 ? <span className="text-green-800">Intermediate</span> : ""}
        {skillValue < 80 && skillValue >= 60 ? <span className="text-red-600">Advanced</span> : ""}
        {skillValue < 100 && skillValue >= 80 ? <span className="text-red-900">Expert</span> : ""}
    </>
}