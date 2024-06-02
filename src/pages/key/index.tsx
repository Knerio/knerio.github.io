// @ts-nocheck
"use client"

import {useEffect, useState} from "react";

export default function App() {
    const [md, setMD] = useState<string>("");


    useEffect(() => {
        fetch("https://raw.githubusercontent.com/knerio/knerio/main/public/PUBLIC_KEY.txt")
            .then(response => response.text()
            ).then((value: string) => {
            setMD(value)
        })
    }, []);


    return <>
        <div className={"center"}>
            <div>{md}</div>
        </div>
    </>
}