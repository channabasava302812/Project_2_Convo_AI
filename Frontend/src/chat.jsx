import './chat.css';
import { MyContext } from './MyContext';
import { useContext, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypehighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';

function Chat() {
  const { newChat, prevChat, reply } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
     if(reply === null) {
            setLatestReply(null); //prevchat load
            return;
        }
    if (!prevChat?.length) return;

    const content = reply.split(" ");
    let idx = 0;

    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "));
      idx++;
      if (idx >= content.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [prevChat, reply]);

  return (
    <>
      {newChat && <h1>Start a new Chat!</h1>}

      <div className="chats">
        {prevChat?.slice(0, -1).map((chat, idx) => (
          <div className={chat.role === 'user' ? 'userDiv' : 'gptDiv'} key={idx}>
            {chat.role === 'user' ? (
              <p className="userMessage">{chat.content}</p>
            ) : (
              <ReactMarkdown rehypePlugins={[rehypehighlight]}>
                {chat.content}
              </ReactMarkdown>
            )}
          </div>
        ))}
        {
            prevChat.length > 0 && (
              latestReply ===null ?(
                <div className="gptDiv" key={`non-typing-${prevChat.length}`}>
            <ReactMarkdown rehypePlugins={[rehypehighlight]}>
              {prevChat[prevChat.length-1].content}
            </ReactMarkdown>
               </div>
              ) :
              (
                <div className="gptDiv" key={`typing-${prevChat.length}`}>
                 <ReactMarkdown rehypePlugins={[rehypehighlight]}>
                    {latestReply}
                  </ReactMarkdown>
          </div>
              )
            )
        }
        
      </div>
    </>
  );
}

export default Chat;