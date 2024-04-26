import React, { useState,useEffect } from 'react';
import './Menu.css';

export default function Menu() {
    const[joins,setjoins]=useState([]);

    useEffect(() => {
      
        getjoins();
      }, []); 
    const roomcreated = async () => {
        const val = document.getElementById("roominput").value;
        console.log(val)
        document.getElementById("roominput").value = "";
    
        try {
            if (val === "") return;
    
            const response = await fetch('http://localhost:5004/newgroup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    RoomName: val, 
                    Owner: "currowner"
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to create new room');
            }
    
        } catch (error) {
            console.error('Error creating room:', error);
        }

    };

    const roomrequest = async () => {
        const val = document.getElementById("roominput").value;
        console.log(val)
        document.getElementById("roominput").value = "";
    
        try {
            if (val === "") return;
    
            const response = await fetch('http://localhost:5004/roomrequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    
                    Owner: "currowner",
                    Requester:" requester",
                    room: val


                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to create new room');
            }
    
        } catch (error) {
            console.error('Error creating room:', error);
        }
    };

    const getjoins = async () => {
        let user = "currowner"
        try {
          
          const response = await fetch(`http://localhost:5004/joins/${user}`);
          
          const joins = await response.json();


          setjoins(joins)
          console.log(joins)
         

        } catch (error) {
          console.error('Error fetching rooms:', error);
          return null;
        }
      };

    const accept =async()=>{
       
            
        try {
            
    
            const response = await fetch('http://localhost:5004/accept', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Owner: "currowner",
                    Requester:" requester",
                    room : "lasdml"
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to accept');
            }
    
        } catch (error) {
            console.error('Error accepting:', error);
        }

    };
    const Decline = async () => {
        try {
            const response = await fetch('http://localhost:5004/decline', {
                method: 'DELETE', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Owner: "currowner",
                    Requester: "requester",
                    room: "adae"
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to accept');
            }
        } catch (error) {
            console.error('Error accepting:', error);
        }
    };
    
    


    

    return (
        <div className="menu">
            <div>
                <input id='roominput' placeholder='enter groupe'></input>
                <button onClick={roomcreated}>Create new Room</button>
                <button onClick={roomrequest}>Join room</button>


            </div>
            <div>
                <div>
                    <h2>Join request</h2>
                    <div className='request'>
                      
                    {joins.map((join, index) => {
                    if (join.accues === false) {
                        return (
                    <div key={index}>
                        <p>{join.requester}</p>
                        <button onClick={accept} className='reqbuttons'>Accept</button>
                        <button  onClick={Decline} className='reqbuttons'>Decline</button>
                    </div>
                     );
                        } else {
                        return null;
                    }
                    })}
                        
                    </div>

                </div>
                <div>
                <h2>Your Rooms</h2>
                   
                    <button >
                        <p>room</p>
                    </button>
                   

                </div>
                

            </div>

            

            
        </div>
    );
}
