// @ts-nocheck
"use client"

import {useEffect, useState} from "react";
import {marked} from "marked";
import '../styles/index.module.css';

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
        <div style="
            background-color: #121212;
            width: 40%;
            color: white;
            margin-left: 25%;
            font-family: Arial, sans-serif;
            line-height: 1.6;
        "

        >
            <div dangerouslySetInnerHTML={{__html: md}}/>
        </div>
    </>
}