const express = require('express');


const server = express();
const bodyParser = require('body-parser');


const{Pool} =require('pg')
server.use(bodyParser.json());
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
const pool = new Pool({
  user: 'postgres',
  password: '23Raul',
  host: 'localhost',
  port: 3000,
  database: 'Calanderproject'
});
server.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM calendarentity');
      res.send(result.rows);
    } catch (error) {
      console.error('Error getting entity', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  server.get('/joins/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM roomsreq WHERE Owner = $1', [id]);
        
        res.send(result.rows);
    } catch (error) {
        console.error('Error getting entity', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


  server.post('/newmessage', async (req, res) => {
    const { user, message, year, month, location, Room } = req.body;
    console.log("hello")
    try {
      const result = await pool.query(`
        INSERT INTO CalendarEntity (location, "user", year, message, month, roomstring) 
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [location, user, year, message, month, Room]);
  
      res.send('Data inserted successfully');
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  server.post('/newgroup', async (req, res) => {
    const {RoomName,Owner } = req.body;
    
    
    try {

      const result = await pool.query(`
        INSERT INTO YourRooms (RoomName,Owner) 
        VALUES ($1, $2 )
      `, [ RoomName,Owner]);
  
      res.send('Data inserted successfully');
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  server.post('/roomrequest', async (req, res) => {
    const {Owner,Requester,room } = req.body;
  
    
    try {

      const result = await pool.query(`
        INSERT INTO roomsreq (Owner,Requester,room) 
        VALUES ($1, $2,$3)
      `, [ Owner,Requester,room ]);
  
      res.send('Data inserted successfully');
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  server.post('/accept', async (req, res) => {
    const { Owner, Requester, room } = req.body;
    
    try {
        const result = await pool.query(`
            UPDATE roomsreq
            SET accues = TRUE
            WHERE Owner = $1 AND Requester = $2 AND room = $3
        `, [Owner, Requester, room]);

        res.send('Data updated successfully');
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).send('Internal Server Error');
    }
});
server.delete('/decline', async (req, res) => {
  const { Owner, Requester, room } = req.body;
  
  
  try {
      
      const result = await pool.query(`
      
          DELETE FROM roomsreq
          WHERE Owner = $1 AND Requester = $2 AND room = $3
      `, [Owner, Requester, room]);

      res.send('Data Deleted successfully');
  } catch (error) {
      console.error('Error Deleting data:', error);
      res.status(500).send('Internal Server Error');
  }
});

    
    



server.listen(5004,()=>console.log('lising on port 5004'))