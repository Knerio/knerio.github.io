// @ts-nocheck
"use client"


import {useEffect, useState} from "react";
import {marked} from "marked";

export default function App() {
    const [content, setContent] = useState<string>("");


    useEffect(() => {
        fetch("https://raw.githubusercontent.com/Knerio/knerio.github.io/main/public/id_rsa.pub")
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