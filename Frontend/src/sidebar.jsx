import './sidebar.css';
import { useContext, useEffect } from 'react';
import { MyContext } from './MyContext';
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
    const { allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChat } = useContext(MyContext);
    const getAllThreads = async () => {
        try {
            const response = await fetch('https://project-2-convo-ai.onrender.com/api/thread');
            const res = await response.json();
            const filteredData = res.map(thread => ({ threadId: thread.threadId, title: thread.title }));
            setAllThreads(filteredData);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getAllThreads();
    }, [currThreadId])

    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChat([]);
    }
    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);

        try {
            const response = await fetch(`https://project-2-convo-ai.onrender.com/api/thread/${newThreadId}`);
            const res = await response.json();
            setPrevChat(res);
            setNewChat(false);
            setReply(null);
        } catch (err) {
            console.log(err);
        }
    }
    const deleteThread = async (threadId) => {
        try {
            const response = await fetch(`https://project-2-convo-ai.onrender.com/api/thread/${threadId}`, { method: "DELETE" });
            const res = await response.json();
            setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));
            if (threadId === currThreadId) {
                createNewChat();
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (<section className='sidebar'>
        {/* New chat button */}
        <button onClick={createNewChat}>
            <img src='src/assets/blacklogo.png' alt='chat logo' className='logo'></img>
            <span><i className="fa-solid fa-pen-to-square"></i></span>
        </button>
        {/* History */}
        <ul className="history">
            {
                allThreads?.map((thread, idx) => (
                    <li key={idx} onClick={(e) => changeThread(thread.threadId)}
                        className={thread.threadId === currThreadId ? "highlighted" : " "}
                    >{thread.title}
                        <i className="fa-solid fa-trash"
                            onClick={(e) => { e.stopPropagation(); deleteThread(thread.threadId); }}></i></li>
                ))
            }
        </ul>

        {/* sign */}
        <div className="sign">
            <p>ChannuKampli &hearts;</p>
        </div>
    </section>)
}

export default Sidebar;