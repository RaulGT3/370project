import React, { useState, useEffect } from 'react';
import './Calander.css';

const dates = {
    "January": 31, "February": 28, "March": 31, "April": 30,
    "May": 31, "June": 30, "July": 31, "August": 31, "September": 30,
    "October": 31, "November": 30, "December": 31
};

export default function Calendar({ room, name }) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const testmonth = Object.keys(dates)[currentMonth];
    const currentYear = currentDate.getFullYear();
    const options = { monthName: 'long' };
    const currentfull = currentDate.toLocaleDateString('en-US', options);
    const [currentMonthIndex, setCurrentMonthIndex] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);
    const monthName = Object.keys(dates)[currentMonthIndex];
    const daysInMonth = dates[monthName];
    const [Day, setdays] = useState("");
    const [data, setdata] = useState([]);
    const [modalOpenedit, setModalOpen] = useState(false);
    const [modalOpenedview, setModalOpenview] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [messageInput, setMessageInput] = useState("");

    const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

    useEffect(() => {
        calentitys();
        const intervalId = setInterval(calentitys, 20000);
        return () => clearInterval(intervalId);
    }, [room]);

    function nextMonth() {
        setCurrentMonthIndex(prevIndex => (prevIndex + 1) % 12);
        if (monthName === "December") {
            setYear(prevYear => prevYear + 1);
        }
        document.getElementById('back').style.display = 'block';
    }

    function backMonth() {
        if (monthName === "January") {
            setYear(prevYear => prevYear - 1);
        }
        if (monthName === testmonth && currentYear === year) {
            document.getElementById('back').style.display = 'none';
        } else {
            setCurrentMonthIndex(prevIndex => (prevIndex - 1 + 12) % 12);
        }
    }

    const edit = (day) => {
        setdays(day);
        setSelectedDay(day);
        setModalOpen(true);
    };
    const view = (day) => {
        setdays(day);
        setSelectedDay(day);
        setModalOpenview(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalOpenview(false);
        setSelectedDay(null);
        setMessageInput(""); 
    };

    const handleMessageChange = (e) => {
        setMessageInput(e.target.value);
    };

    const handleSaveMessage = async (e) => {
        e.preventDefault();
        const message = messageInput.trim();
        if (message === "") return;

        try {
            const response = await fetch('http://localhost:5004/newmessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: name,
                    message: message,
                    year: year,
                    month: monthName,
                    location: Day,
                    roomstring: room,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setdata([...data, { user: name, message: message, year: year, month: monthName, location: Day }]);
            closeModal(); // Close the modal after saving
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const calentitys = async () => {
        try {
            const response = await fetch(`http://localhost:5004/${room}`);
            const data = await response.json();
            setdata(data);
        } catch (error) {
            console.error('Error fetching old messages:', error);
            return null;
        }
    };

    const removemessage = async (id) => {
        try {
            const response = await fetch('http://localhost:5004/removemessage', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ID: id }),
            });

            if (!response.ok) {
                throw new Error('Failed to removemessage');
            }

            setdata(data.filter(message => message.id !== id));
        } catch (error) {
            console.error('Error removing message:', error);
        }
    };

    return (
        <div className="Holder">

            <h1> Current Calendar: {room} </h1>
            
            <h2>Today: {currentfull}</h2>
            <div className="month-container">
                <h2>Current Month/Year: {monthName}/{year}</h2>
                <button onClick={backMonth} className='backbutton' id='back'>Back</button>
                <button onClick={nextMonth} className='nextbutton'>Next</button>
            </div>

            <div className="Container">

                {room !== "" ?(
                daysArray.map((day) => (
                    <div id={`Box-${day}`} className="Box" key={day}>
                        <div>
                            <a>{day}</a>
                            <button className="Backbutton" onClick={() => edit(day)}>Edit</button>
                            <button className="Backbutton" onClick={() => view(day)}>View</button>
                        </div>
                        <div className='Messages'>
                            {data.map((messageData, index) => {
                              
                                if (messageData.year === year && messageData.month === monthName && messageData.location === day) {
                                    return (
                                        <div className='TEXT' key={index}>
                                            <button onClick={() => removemessage(messageData.id)} className='tetxbuttons1'></button>
                                            <p className='message'>{messageData.user}: {messageData.message}</p>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                ))

                ):( 
                    <div>
                    <h3>No Current Calander Selected</h3>
                    <p>create or join calander to continue</p>
                    </div>
                )}

            </div>

            
            {modalOpenedit && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Edit Message for Day {selectedDay}</h2>
                        <form onSubmit={handleSaveMessage}>
                            <textarea className='textarea'
                                type="text"
                                value={messageInput}
                                onChange={handleMessageChange}
                                placeholder="Enter your message"
                            />
                            <button type="submit">Save</button>
                            <button type="button" onClick={closeModal}>Close</button>
                        </form>
                    </div>
                </div>
            )}
              {modalOpenedview && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2> Message for Day {selectedDay}</h2>
                        <div className='viewmessages'>
                            {data.map((messageData, index) => {
                                if (messageData.year === year && messageData.month === monthName && messageData.location === Day) {
                                    return (
                                        <div className='TEXT' key={index}>
                                            <p className='message'>{messageData.user}: {messageData.message}</p>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>

                    
                    
                            
                        <button type="button" onClick={closeModal}>Close</button>
                       
                    </div>
                </div>
            )}
        </div>
    );
}
