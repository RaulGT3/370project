import React, { useState, useEffect } from 'react';
import './App.css';
import Calander from './Calander.js';
import Menu from './Menu.js';
import LoginAndRegister from './login-register';

function App() {
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [room, setRoom] = useState("");
    
    const handleLogout = () => {
        localStorage.removeItem("username");
        setUsername(null);
    };
  
    const backgroundImage = 'https://st2.depositphotos.com/2124221/46127/i/600/depositphotos_461279104-stock-photo-abstract-geometric-background-poly-pattern.jpg';
    const backgroundImage2 = 'https://cdn.pixabay.com/photo/2018/03/10/12/00/teamwork-3213924_1280.jpg';
    return (
        <div className="App" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', }}>
            
            {username ? (
                <div className="app">
                    <button className='logout' onClick={handleLogout}>Logout</button>
                    <div className="components-container">
                        <Calander room={room} name={username}/>
                        <Menu setR={setRoom} />
                    </div>
                </div>
            ) : (
                
                <div >
                    <h1>Calenderfi</h1>
                    <div className="main" style={{ display: 'flex',boxShadow: '0px 40px 10px rgba(0, 0, 0, 0.5)'  } }>
                    
                     <div style={{ flex: 1 ,boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.5)' }}>
                        
                        <LoginAndRegister setU={setUsername} />
                    </div>
                    <div style={{ flex: 1, backgroundImage: `url(${backgroundImage2})`, backgroundSize: 'cover', backgroundPosition: 'center' ,boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.5)',}}>
                       
                    </div>
                    </div>
                   
                </div>
            )}
        </div>
    );
}
export default App;
