import {useEffect} from "react";
import {useNavigate} from "react-router-dom";


export const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('authToken');
        navigate("/sign-in");
    }, []);
    return <></>;
};
//     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyYjgyNDExLWNmNjMtNDMxNy04NzRmLTk3YmEwZDU4NjUyZiIsInVzZXJuYW1lIjoiYUBhLnBsIiwiZW1haWwiOiJhQGEucGwiLCJyb2xlcyI6WzFdLCJpYXQiOjE3MDgxODg5NjYsImV4cCI6MTcxMDc4MDk2Nn0.ptXAFfNTP7UMT1oGJP5Cp1xoN0z12y4VVihrheU5yhw