import React, { useState,useEffect } from 'react';

import './Calander.css';

const dates = {
    "January": 31, "February": 28, "March": 31, "April": 30,
    "May": 31, "June": 30, "July": 31, "August": 31, "September": 30,
    "October": 31, "November": 30, "December": 31
};

export default function Calendar() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const testmonth = Object.keys(dates)[currentMonth] 
    const currentYear = currentDate.getFullYear();
    const options = { monthName: 'long' };
    const currentfull = currentDate.toLocaleDateString('en-US', options)
    const [currentMonthIndex, setCurrentMonthIndex] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);
    const monthName = Object.keys(dates)[currentMonthIndex];
    const daysInMonth = dates[monthName];
    const [Day, setdays] = useState("");
    const[data,setdata]=useState([]);

    const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);
    useEffect(() => {
      
        calentitys();
      }, []); 
    
    function nextMonth() {

        setCurrentMonthIndex(prevIndex => (prevIndex + 1) % 12);
        if (monthName ==="December"){
            setYear(prevYear => prevYear + 1);
        }
        document.getElementById('back').style.display = 'block';
    }
    function backMonth() {
        if (monthName ==="January"){
            setYear(prevYear => prevYear - 1);
        }
      
        if(monthName === testmonth&& currentYear === year){
            document.getElementById('back').style.display = 'none';
        }else{
        setCurrentMonthIndex(prevIndex => (prevIndex - 1 + 12) % 12);
        }
        
    }
    function edit(day){
        setdays(day)
        if(document.getElementById(`mess-${day}`).style.display != 'block'){
        document.getElementById(`Box-${day}`).style.height = '300px';
        document.getElementById(`Box-${day}`).style.width = '300px';
        document.getElementById(`mess-${day}`).style.display = 'block';
        }else{
            document.getElementById(`Box-${day}`).style.height = '125px';
            document.getElementById(`Box-${day}`).style.width = '125px';
            document.getElementById(`mess-${day}`).style.display = 'none';

        }
        
    }
    const calentitys = async () => {
        try {
          
          const response = await fetch('http://localhost:5004/');
          const data = await response.json();

          setdata(data)
         

        } catch (error) {
          console.error('Error fetching old messages:', error);
          return null;
        }
      };

      const newmessage = async ( e) => {
        try {
            const message = e.target.value.trim();
            if (message === "") return; 
    
            const response = await fetch('http://localhost:5004/newmessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: "YourUsername", 
                    message: message,
                    year: year,
                    month: monthName,
                    location: Day,
                    roomstring:"INDVIDUAL"

                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to send message');
            }
    
            
            setdata([...data, { user: "YourUsername", message: message, year: year, month: monthName, location: Day }]);
            e.target.value = ''; 
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    
    
    return (
        <div className="Holder">
            <h1> Current Calendar: Individual </h1>
            <h2>today:{currentfull}</h2>
            <div className="month-container">
                
                <h2>Current Month/Year: {monthName}/{year}</h2>
              
                <button onClick={backMonth} className='backbutton' id='back'>Back</button>
                <button onClick={nextMonth}>Next</button>
                
            </div>
            
            <div className="Container">
                {daysArray.map((day) => (
                    <div id={`Box-${day}`} className="Box" key={day}>
                        <div>
                            <a>{day}</a>
                            <button className="Backbutton" onClick={()=>edit(day)}>Edit</button>
                        </div>
                        <div className='Messages'>
                    
                        <input id={`mess-${day}`} onKeyDown={(e) => e.key === 'Enter' && newmessage(e)} className='MessageInput' placeholder='Enter Thing'></input>
                     
                        {data.map((data,index) => {
                                console.log( data.month)
                             if (data.year === year && data.month === monthName && data.location === day) {
                                
                                return (
                                    <p key={index}>{data.user}: {data.message}</p>
                                );
                            } else {
                                return null; 
                            }
                        })}
                         
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 

