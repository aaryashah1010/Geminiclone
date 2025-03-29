import { createContext, useState } from "react";
import run from "../config/gemini";
export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    };

    const onSent = async (prompt) => {
        const finalPrompt = (prompt || input || "").toString();
        if (!finalPrompt.trim()) return;

        setResultData("");
        setLoading(true);
        setShowResult(true);

        try {
            let response = await run(finalPrompt);
            setRecentPrompt(finalPrompt);
            setPrevPrompt((prev) => [...prev, finalPrompt]);

            let responseArray = response.split("**");
            let newResponse = "";
            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }
            let newResponse2 = newResponse.split("*").join("<br>");
            let newResponseArray = newResponse2.split(" ");
            for (let i = 0; i < newResponseArray.length; i++) {
                const nextWord = newResponseArray[i];
                delayPara(i, nextWord + " ");
            }
        } catch (err) {
            setResultData("An error occurred while generating the response.");
            console.error(err);
        }

        setLoading(false);
        setInput("");
    };

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        setShowResult,    
        loading,
        resultData,
        setResultData,    
        input,
        setInput,
    };
    

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
