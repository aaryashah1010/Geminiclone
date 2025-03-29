import React, { useContext, useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, input, setInput } = useContext(Context);
    const [image, setImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
                setInput(`[Image: ${file.name}]`);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMicInput = async () => {
        try {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'en-US';
            recognition.start();

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
            };

            recognition.onerror = (event) => {
                console.error('Voice recognition error:', event.error);
            };
        } catch (error) {
            alert('Voice recognition not supported in your browser.');
        }
    };

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="User" />
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, Aarya.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip?</p>
                                <img src={assets.compass_icon} alt="Compass" />
                            </div>
                            <div className="card">
                                <p>Briefly summarize Urban Planning</p>
                                <img src={assets.bulb_icon} alt="Bulb" />
                            </div>
                            <div className="card">
                                <p>Get insights into machine learning</p>
                                <img src={assets.message_icon} alt="Message" />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="Code" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="User" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="Gemini" />
                            <p dangerouslySetInnerHTML={{ __html: resultData }} />
                        </div>
                    </div>
                )}
            </div>
            <div className="main-bottom">
                <div className="search-box">
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        type="text"
                        placeholder="Enter a prompt here"
                        className='input-box'
                    />
                    <div>
                        <label htmlFor="imageUpload">
                            <img src={assets.gallery_icon} alt="Gallery" />
                        </label>
                        <input
                            id="imageUpload"
                            type="file"
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        <img src={assets.mic_icon} alt="Mic" onClick={handleMicInput} />
                        <img onClick={() => onSent()} src={assets.send_icon} alt="Send" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
