import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
    <CookiesProvider><Home /></CookiesProvider> 
     </BrowserRouter>
   
  </StrictMode>,
)
