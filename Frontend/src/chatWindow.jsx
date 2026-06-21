import './chatWindow.css';
import Chat from './chat';
import { MyContext } from './MyContext';
import { useState, useContext, useEffect } from 'react';
import { ScaleLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function ChatWindow() {
    const { prompt, setPrompt, reply, setReply, currThreadId, prevChat, setPrevChat, setNewChat } = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [cookies, removeCookie] = useCookies([]);
    const navigate = useNavigate();

    const getReply = async () => {
        setLoading(true);
        setNewChat(false);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            }),
        };

        try {
            const response = await fetch("https://project-2-convo-ai.onrender.com/api/chat", options);
            const res = await response.json();
            setReply(res.reply);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }
    useEffect(() => {
        if (prompt && reply) {
            setPrevChat(prevChat => (
                [...prevChat, {
                    role: 'user',
                    content: prompt
                },
                {
                    role: 'assistant',
                    content: reply
                }]
            ));
        }
        setPrompt("");
    }, [reply]);

    const handleProfilePic = () => {
        setIsOpen(!isOpen);
    }

    const HandleLogout = () => {
        removeCookie("token");
        navigate("/login");
    }
    return (
        <div className="chatWindow">
            <div className="navbar">
                <span>SigmaGPT<i className="fa-solid fa-angle-down"></i></span>
                <div className='container'>
                    <Link to="/signup" ><button className='ssignup'>Signup</button></Link>
                </div>

                <div className="userIconDiv">
                    <span className='userIcon'><i className="fa-solid fa-user" onClick={handleProfilePic}></i></span>
                </div>
            </div>
            {
                isOpen &&
                <div className="drop-down">
                    <div className="drop-down-items"><i className="fa-solid fa-gear"></i>Settings</div>
                    <div className="drop-down-items"><i className="fa-solid fa-cloud-arrow-up"></i>Upgrade</div>
                    <div className="drop-down-items" onClick={HandleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i>LogOut</div>
                </div>
            }
            <Chat></Chat>
            <ScaleLoader color='#fff' loading={loading}>

            </ScaleLoader>
            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder='Ask anything'
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''}
                    ></input>
                    <div id='submit' onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className='info'>SigmaGPT can make mistake.Check important info.See Cookies Performance</p>

            </div>
        </div>
    )
}

export default ChatWindow;