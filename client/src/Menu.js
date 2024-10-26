import React, { useState,useEffect } from 'react';
import './Menu.css';

export default function Menu({setR}) {
    const[joins,setjoins]=useState([]);
    const[getrooms,setrooms]=useState([]);
    const [currentuser, setUser] = useState(localStorage.getItem("username"));
    const [currenterowner,setcurrentowner]=useState(localStorage.getItem("username"));
    const[usersinroom,setuserinroom]=useState([]);
    const[currroom,setcurrroom]=useState("");
    useEffect(() => {
        
      
        getjoins();
      
        const intervalId = setInterval(getjoins, 10000); 
        return () => clearInterval(intervalId);
        
        
      }, []); 
      useEffect(() => {
        
      
        getusersinroom();
      
        const intervalId = setInterval(getusersinroom, 10000); 
        return () => clearInterval(intervalId);
        
        
      }, [currroom,usersinroom]); 

      useEffect(() => {
        
        
        getyourrooms();
       

       
        const intervalP = setInterval(getyourrooms, 10000); 
        return () => clearInterval(intervalP);
        
      }, [currroom]); 

  
        const assur_room_is_active = async(getRooms,curRoom) => {
            
            console.log(curRoom)
            console.log(getRooms)
            const roomActive = getRooms.some(room => room.room === curRoom);
        
            console.log("pp")
            if (!roomActive) {
                setR(""); 
            }
        };
                                        
            
                    

    
    const roomexist = async (val) => {
        try {
          
            const response = await fetch(`http://localhost:5004/checkroom/${val}`);
            const data = await response.json();
           
            return data.statuse;
            
           
  
          } catch (error) {
            console.error('Error fetching old messages:', error);
            return 
          }

        
    };

    const roomcreated = async () => {
        const val = document.getElementById("roominput").value;
   
        document.getElementById("roominput").value = "";
        const check = await roomexist(val)
        try {
            if (val === "") return;
            if(check){

                alert("room name alrady exist")
                return
            }
    
            const response = await fetch('http://localhost:5004/newgroup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    RoomName: val, 
                    Owner: currentuser
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to create new room');
            }
            setrooms([...getrooms, { room: val,owner:currentuser}]);
            alert("room created")
            
    
        } catch (error) {
            console.error('Error creating room:', error);
        }

    };
    const checkowner =  async (val)=>{
      
        try {
            
            const response = await fetch(`http://localhost:5004/findowner/${val}`);
            const nameofowner = await response.json();
            
           
            
            return nameofowner[0].owner;
            
            
           
  
          } catch (error) {
            console.error('Error gettingowner:', error);
            return 
          }
        }



    const roomrequest = async () => {
        
        const val = document.getElementById("roominput").value;
        if (val === "") return;
        setcurrroom(val)
        
        
        
        document.getElementById("roominput").value = "";
        
        let ownername
        try {
             ownername = await checkowner(val);
             
           
           
        } catch (error) {
            console.error('Error in roomrequest:', error);
            
        }
    
        try {
            if (ownername === currentuser) {
                alert("You cannot request your own room");
                return;
            }
                
    
            const response = await fetch('http://localhost:5004/roomrequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   
                    Owner: ownername,
                    Requester:currentuser,
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
        
        try {
          
          const response = await fetch(`http://localhost:5004/joins/${currentuser}`);
          
          const joins = await response.json();
          


          setjoins(joins)
         
         

        } catch (error) {
          console.error('Error fetching joins:', error);
          return null;
        }
      };
      

    const accept =async(reqe,theroom)=>{  
        try {
             
            
            const response = await fetch('http://localhost:5004/accept', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    
                    Owner: currentuser,
                    Requester:reqe,
                    room : theroom
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to accept');
            }
            setjoins(prevJoins => prevJoins.filter(join => join.requester !== reqe && join.room !== theroom));
        } catch (error) {
            console.error('Error accepting:', error);
        }

    };
    const Decline = async (reqe,theroom) => {
        try {
            const response = await fetch('http://localhost:5004/decline', {
                method: 'DELETE', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    //come here
                    Owner: currentuser,
                    Requester: reqe,
                    room: theroom
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to accept');
            }
            setjoins(prevJoins => prevJoins.filter(join => join.requester !== reqe && join.room !== theroom));
        } catch (error) {
            console.error('Error accepting:', error);
        }
    };
    const getyourrooms = async () => {
        
        try {
          
          const response = await fetch(`http://localhost:5004/getrooms/${currentuser}`);
          
          const getrooms = await response.json();


          setrooms(getrooms)
          assur_room_is_active(getrooms,currroom);
          
         

        } catch (error) {
          console.error('Error fetching rooms:', error);
          return null;
        }
      };
      const removeroom = async(id)=>{
        

        try {
            const response = await fetch('http://localhost:5004/removecalander', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ID: id }),
            });

            if (!response.ok) {
                throw new Error('Failed to remove calander');
            }
            setR("")
            setrooms((prevRooms) => prevRooms.filter(room => room.room !== id));
        } catch (error) {
            console.error('Error removing calander:', error);
        }
        
    };

      const getusersinroom = async () => {
        
        try {
        
          const response = await fetch(`http://localhost:5004/getuserinroom/${currroom}`);
          
          const users1 = await response.json();
            

          setuserinroom(users1)
         
         

        } catch (error) {
          console.error('Error fetching users of the room:', error);
          return null;
        }
      };
    
    
    const selectedroom= async(croom)=>{
        setcurrroom(croom)
        let curr = await checkowner(croom)
        setcurrentowner(curr)
        setR(croom)
    }
    const rmuser_ = async(user_torm,roomname)=>{
        
        try {
            const response = await fetch('http://localhost:5004/rmuser', {
                method: 'DELETE', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   
                    user: user_torm,
                    room: roomname
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to rm user');
            }
            setuserinroom(usersinroom.filter(rmuser => rmuser.requester === user_torm && rmuser.room === roomname  ));
            
        } catch (error) {
            console.error('Error rm user:', error);
        }


    }



    

    return (
        <div className="menu">
            <div>
            <input style={{  border: 'solid black 1px',width: '126px', textAlign: 'center', margin: '10px', marginLeft: '32px' }} id='roominput' placeholder='enter group'></input>
            <button style={{background:'white', border: 'solid black 1px', width: '126px', borderRadius: '8px', color: '#150c61' }} onClick={roomcreated}>Create new Room</button>
            <button style={{ background:'white',border: 'solid black 1px',display: 'block', marginLeft: '130px', borderRadius: '8px', color: '#150c61' }} onClick={roomrequest}>Join room</button>


            </div>
            <div>
                <div >
                    <h2>Join request</h2>
                    <div className='request'>
                      
                    {joins.map((join, index) => {
                    if (join.accues === false) {
                        return (
                    <div className='requestbody' key={index}>
                        <p>{join.requester}</p>
                        <button onClick={()=>accept(join.requester,join.room)} className='reqbuttons'>Accept</button>
                        <button  onClick={()=>Decline(join.requester,join.room)} className='reqbuttons'>Decline</button>
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
                    <div className='rooms'>
                    
                   
                    
                {getrooms.map(room => (
                                        
                    <div className='roomsdiv'>
                      
                         
                         {currentuser === room.owner?(
                            
                        <>
                        <button  className='delete_room_button' onClick={()=>removeroom(room.room)}>
                        <p>Delete room</p> 
                        </button>
                        <button  className='roombutton' onClick={()=>selectedroom(room.room)} key={room.id}>
                        <p>{room.room}</p> 
                        </button>
                        </>
                         ):(
                            <button  className='roombutton' onClick={()=>selectedroom(room.room)} key={room.id}>
                            <p>{room.room}</p> 
                             </button>
                         )}

                    </div>
                ))}
                    </div>            

                </div>
                <div>
                    <h2>Users in current calander</h2>
                    <div className='users'>
                       
                      <h3 className='teamlead '>Team Lead:{currenterowner}</h3> 
                      
                     
                      {usersinroom.map((join, index) => {
                     
                      if (join.accues === true && join.room === currroom) {
                        
                          return (
                            
                      <div className='requestbody' key={index}>

                            {currentuser === join.owner?(
                            
                            <>
                                <p>{join.requester}</p>
                                <button  onClick={()=>rmuser_(join.requester,join.room)} className='remov_user'>remove user</button>
                            
                            </>
                             ):(
                          
                          

                                <p>{join.requester}</p>
                            )}
                         
                         
                      </div>
                       );
                          } else {
                          return null;
                      }
                      })}
                          
                      </div>


                




                </div>
                

            </div>

            

            
        </div>
    );
}
