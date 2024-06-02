// @ts-nocheck
"use client"

import {useEffect, useState} from "react";

export default function App() {
    const [md, setMD] = useState<string>("");


    useEffect(() => {
        fetch("https://raw.githubusercontent.com/knerio/knerio.github.io/main/public/PUBLIC_KEY.txt")
            .then(response => response.text()
            ).then((value: string) => {
            setMD(value)
        })
    }, []);


    return <>
        <div>{md}</div>
    </>
}