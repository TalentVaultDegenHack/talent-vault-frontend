import { ReactNode } from "react";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

interface Props {
    icon: IconType;
    className?: ClassValue;
    onClick?: () => void;
}

export type IconType = "me" | "form" | "pending" | "recruiter" | "logout";

const icons: Record<IconType, ReactNode> = {
    logout: (
        <>
            <g clipPath="url(#a)">
                <path fill="#fff" fillOpacity={0.01} d="M24 0H0v24h24V0Z" />
                <path
                    stroke="#333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.996 3H3v18h9M16.5 16.5 21 12l-4.5-4.5M8 11.996h13"
                />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M0 0h24v24H0z" />
                </clipPath>
            </defs>
        </>
    ),
    recruiter: (
        <>
            <g clipPath="url(#a)">
                <path fill="#fff" fillOpacity={0.01} d="M24 0H0v24h24V0Z" />
                <path
                    stroke="#333"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
                />
                <path
                    stroke="#333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 17.5c2.5 0 3.5-2 3.5-2h-7s1 2 3.5 2ZM10.5 10.5s-.5-2-2-2-2 2-2 2M17.5 10.5s-.5-2-2-2-2 2-2 2"
                />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M0 0h24v24H0z" />
                </clipPath>
            </defs>
        </>
    ),
    pending: (
        <>
            <g clipPath="url(#a)">
                <path fill="#fff" fillOpacity={0.01} d="M24 0H0v24h24V0Z" />
                <path
                    stroke="#333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.5 2h17M3.5 22h17"
                />
                <path
                    stroke="#333"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.5 22C6.833 15.33 9 11.997 12 12c3 .003 5.167 3.336 6.5 10h-13Z"
                />
                <path
                    stroke="#333"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.5 2C17.167 8.67 15 12.003 12 12c-3-.003-5.167-3.336-6.5-10h13Z"
                />
                <path
                    stroke="#333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.5 7.5h3M9.5 19h5"
                />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M0 0h24v24H0z" />
                </clipPath>
            </defs>
        </>
    ),
    me: (
        <>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89136 2.75 2.75 6.89136 2.75 12C2.75 17.1086 6.89136 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89136 17.1086 2.75 12 2.75Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.75 9C8.75 7.20509 10.2051 5.75 12 5.75C13.7949 5.75 15.25 7.20509 15.25 9C15.25 10.7949 13.7949 12.25 12 12.25C10.2051 12.25 8.75 10.7949 8.75 9ZM12 7.25C11.0335 7.25 10.25 8.03351 10.25 9C10.25 9.96649 11.0335 10.75 12 10.75C12.9665 10.75 13.75 9.96649 13.75 9C13.75 8.03351 12.9665 7.25 12 7.25Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.99977 15.25C7.74825 15.25 5.90517 17.0012 5.75914 19.2154C5.73189 19.6287 5.37473 19.9416 4.96141 19.9144C4.5481 19.8871 4.23514 19.53 4.2624 19.1166C4.46007 16.1194 6.95289 13.75 9.99977 13.75H13.9998C17.0426 13.75 19.5329 16.1131 19.7364 19.1048C19.7645 19.518 19.4523 19.8758 19.039 19.9039C18.6258 19.932 18.268 19.6198 18.2398 19.2065C18.0895 16.9966 16.2483 15.25 13.9998 15.25H9.99977Z"
                fill="currentColor"
            />
        </>
    ),
    form: (
        <>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.5 3.75C4.08579 3.75 3.75 4.08579 3.75 4.5V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V4.5C20.25 4.08579 19.9142 3.75 19.5 3.75H4.5ZM2.25 4.5C2.25 3.25736 3.25736 2.25 4.5 2.25H19.5C20.7426 2.25 21.75 3.25736 21.75 4.5V19.5C21.75 20.7426 20.7426 21.75 19.5 21.75H4.5C3.25736 21.75 2.25 20.7426 2.25 19.5V4.5Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.25 7C2.25 6.58579 2.58579 6.25 3 6.25H20C20.4142 6.25 20.75 6.58579 20.75 7C20.75 7.41421 20.4142 7.75 20 7.75H3C2.58579 7.75 2.25 7.41421 2.25 7Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.25 11C14.25 10.5858 14.5858 10.25 15 10.25H21C21.4142 10.25 21.75 10.5858 21.75 11C21.75 11.4142 21.4142 11.75 21 11.75H15C14.5858 11.75 14.25 11.4142 14.25 11Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.25 15C14.25 14.5858 14.5858 14.25 15 14.25H21C21.4142 14.25 21.75 14.5858 21.75 15C21.75 15.4142 21.4142 15.75 21 15.75H15C14.5858 15.75 14.25 15.4142 14.25 15Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.75 11C10.75 10.5858 11.0858 10.25 11.5 10.25H12C12.4142 10.25 12.75 10.5858 12.75 11C12.75 11.4142 12.4142 11.75 12 11.75H11.5C11.0858 11.75 10.75 11.4142 10.75 11Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.75 15C10.75 14.5858 11.0858 14.25 11.5 14.25H12C12.4142 14.25 12.75 14.5858 12.75 15C12.75 15.4142 12.4142 15.75 12 15.75H11.5C11.0858 15.75 10.75 15.4142 10.75 15Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 2.25C7.41421 2.25 7.75 2.58579 7.75 3V21C7.75 21.4142 7.41421 21.75 7 21.75C6.58579 21.75 6.25 21.4142 6.25 21V3C6.25 2.58579 6.58579 2.25 7 2.25Z"
                fill="currentColor"
            />
        </>
    ),
};

export const Icon = ({ className, icon, onClick }: Props) => {
    return (
        <svg
            className={cn(
                className,
                {
                    "cursor-pointer": onClick,
                },
                "fill-none",
            )}
            onClick={onClick}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {icons[icon]}
        </svg>
    );
};
