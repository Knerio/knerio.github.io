"use client"

import {useEffect, useState} from "react";
import {marked} from "marked";

export default function App() {
    const [md, setMD] = useState<string>("");


    useEffect(() => {
        fetch("https://raw.githubusercontent.com/knerio/knerio/main/README.md")
            .then(response => response.text()
            ).then((value: string) => {
                value.then(a => {
                    setMD(marked.parse(value))
                })
        })
    }, []);


    return <>
        <div>
            <div dangerouslySetInnerHTML={{__html: md}}/>
        </div>
    </>
}