import React, { useState, useEffect } from 'react';
import './login-register.css';

export default function LoginAndRegister({setU}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true); 


    const checkusername =  async ()=>{
        try {
          
            const response = await fetch(`http://localhost:5004/checkname/${username}`);
            const data = await response.json();
            console.log(data.statuse)
            return data.statuse;
            
           
  
          } catch (error) {
            console.error('Error fetching old messages:', error);
            return 
          }

    }
    const checkuserandpassword =  async ()=>{
        const check = await checkusername(); 
        if(!check){
        
        
            return
        }else{
      
            try {
                
            const response = await fetch(`http://localhost:5004/validate/${username}/${password}`);
            console.log(password,username)
            
            const data = await response.json();
          
            return data.statuse;
            
           
  
          } catch (error) {
            
            console.error('Error in checking', error);
            return 
          }
        }
        

    }
    
    const handleLogin = async() => {
        if(username ===""){
            return
        }
        const valid = await checkuserandpassword(); 
        console.log("hello",valid)
        if(valid){
            
            localStorage.setItem('username', username);
            setU(username)
           
        }else{
            alert("not valid username or password")
            return
        }

        

       
    };

    const handleRegister  =async() => {
        if(username ===""){
            return
        }
        
        const exists = await checkusername(); 
        if(exists){
            alert("name exist")
        
            return
        }
        else{
            try {
              
               
                const response = await fetch(`http://localhost:5004/postnewuser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        
                        username: username,
                        password:password,
                        
    
    
                    })
                });
        
                if (!response.ok) {
                    throw new Error('Failed to create user');
                }
                alert("account created")
        
            } catch (error) {
                console.error('Error creating room:', error);
            }
            
            
        }
        
     


        
    };

    return (
        <div className="login-register-container">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <br></br>
                <div className="form-group">
                    <label>Password</label>
                    <input st type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <br></br>
                <button type="button" onClick={isLogin ? handleLogin : handleRegister}>
                    {isLogin ? 'Login' : 'Register'}
                </button>
                <p onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Don\'t have an account? Register here.' : 'Already have an account? Login here.'}
                </p>
            </form>
        </div>
    );
}
