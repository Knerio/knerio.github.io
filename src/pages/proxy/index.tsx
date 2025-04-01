import { useState } from "react";

export default function ProxyApp() {
    const [url, setUrl] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const proxyUrl = "https://worker.derioo.de"; 

    const fetchSite = async (): Promise<void> => {
        try {
            const response = await fetch(`${proxyUrl}?url=${encodeURIComponent(url)}`);
            const text = await response.text();
            setContent(text);
        } catch (error) {
            console.error("Failed to fetch content", error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                placeholder="Enter website URL"
            />
            <button onClick={fetchSite}>Fetch</button>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}
