// @ts-nocheck
"use client"

import {useEffect, useState} from "react";
import {marked} from "marked";

export default function App() {
    const [md, setMD] = useState<string>("");


    useEffect(() => {
        fetch("https://raw.githubusercontent.com/knerio/knerio/main/README.md")
            .then(response => response.text()
            ).then((value: string) => {
            setMD(marked.parse(value))
        })
    }, []);


    return <>
        <div className={"center darkmode"}>
            <div dangerouslySetInnerHTML={{__html: md}}/>
        </div>
    </>
}