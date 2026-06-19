import './App.css'
import Sidebar from './sidebar.jsx';
import ChatWindow from './chatWindow.jsx';
import { MyContext } from './MyContext.jsx';
import { useState } from 'react';
import{v1 as uuidv1} from 'uuid';


function App() {
  const [prompt, setPrompt] = useState("")
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChat, setPrevChat] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

const providervalues = {
  prompt,setPrompt,
  reply,setReply,
  currThreadId,setCurrThreadId,
  prevChat, setPrevChat,
  newChat, setNewChat,
  allThreads, setAllThreads
};
  return (
    <div className='app'>
      <MyContext.Provider value={providervalues}>
     <Sidebar></Sidebar>
     <ChatWindow></ChatWindow>
     </MyContext.Provider>
    </div>
  )
}


export default App;




