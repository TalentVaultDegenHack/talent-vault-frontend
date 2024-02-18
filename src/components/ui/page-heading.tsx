interface Props {
    title: string;
}

export const PageHeading = ({ title }: Props) => {
    return <>
        <div className="px-8 py-6">
            <h1 className="font-semibold text-3xl text-gray-800">{title}</h1>
        </div>
    </>
}