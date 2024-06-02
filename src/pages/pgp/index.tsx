// @ts-nocheck
"use client"


import {useEffect, useState} from "react";

export default function App() {
    const [content, setContent] = useState<string>("");


    useEffect(() => {
        fetch("https://raw.githubusercontent.com/Knerio/knerio.github.io/main/public/public.asc")
            .then(response => response.text()
            ).then((value: string) => {
            setContent(value)
        })
    }, []);


    return <>
        <div className={"center"}>
            <div>{content}</div>
        </div>
    </>
}