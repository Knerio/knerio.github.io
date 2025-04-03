import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ColorConverter() {
    const router = useRouter();
    const [rgb, setRgb] = useState({ r: 255, g: 255, b: 255 });
    const [hex, setHex] = useState("#ffffff");
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        const queryColor = router.query.color as string;
        if (queryColor && /^#([0-9A-F]{6})$/i.test(queryColor)) {
            setHex(queryColor);
            setRgb(hexToRgb(queryColor));
            setColor(queryColor);
        }
    }, [router.query.color]);

    const updateUrl = (newHex) => {
        router.push({
            pathname: router.pathname,
            query: { color: newHex },
        }, undefined, { shallow: true });
    };

    const rgbToHex = (r, g, b) => {
        return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase();
    };

    const hexToRgb = (hex) => {
        let bigint = parseInt(hex.slice(1), 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255,
        };
    };

    const handleRgbChange = (e) => {
        let value = Math.min(16777215, Math.max(0, Number(e.target.value)));
        const newRgb = {
            r: (value >> 16) & 255,
            g: (value >> 8) & 255,
            b: value & 255,
        };
        setRgb(newRgb);
        const hexValue = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
        setHex(hexValue);
        setColor(hexValue);
        updateUrl(hexValue);
    };

    const handleHexChange = (e) => {
        let value = e.target.value;
        if (/^#([0-9A-F]{6})$/i.test(value)) {
            setHex(value);
            setRgb(hexToRgb(value));
            setColor(value);
            updateUrl(value);
        } else {
            setHex(value);
        }
    };

    const handleColorPick = (e) => {
        setHex(e.target.value);
        setRgb(hexToRgb(e.target.value));
        setColor(e.target.value);
        updateUrl(e.target.value);
    };

    return (
        <div className="p-4 bg-gray-800 text-white rounded-lg space-y-4 max-w-sm mx-auto">
            <div className="flex flex-col space-y-2">
                <label>RGB (as one integer, 0-16777215)</label>
                <input
                    type="number"
                    value={(rgb.r << 16) | (rgb.g << 8) | rgb.b}
                    onChange={handleRgbChange}
                    className="p-2 bg-gray-700 rounded text-white w-full text-center"
                />
            </div>
            <div className="flex flex-col space-y-2">
                <label>HEX</label>
                <input
                    type="text"
                    value={hex}
                    onChange={handleHexChange}
                    className="p-2 bg-gray-700 rounded text-white w-full text-center uppercase"
                />
            </div>
            <div className="flex flex-col space-y-2">
                <label>Pick a color</label>
                <input
                    type="color"
                    value={color}
                    onChange={handleColorPick}
                    className="w-full h-10"
                />
            </div>
        </div>
    );
}