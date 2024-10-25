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


server.get('/:room', async (req, res) => {
    const { room } = req.params;
   
 
    try {
      const result = await pool.query('SELECT * FROM calendarentity WHERE roomstring = $1',[room]);
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

server.get('/getuserinroom/:id', async (req, res) => {
  const { id } = req.params;
  

  try {
      const result = await pool.query('SELECT * FROM roomsreq WHERE room = $1', [id]);
      
      res.send(result.rows);
  } catch (error) {
      console.error('Error getting entity', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


  server.post('/newmessage', async (req, res) => {
    const { user, message, year, month, location, roomstring } = req.body;
   
    try {
      const result = await pool.query(`
        INSERT INTO CalendarEntity (location, "user", year, message, month, roomstring) 
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [location, user, year, message, month, roomstring]);
  
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

server.get('/getrooms/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT id, roomname AS room, owner
      FROM YourRooms 
      WHERE owner = $1
      UNION ALL 
      SELECT id, room, owner AS owner
      FROM roomsreq 
      WHERE requester = $1 AND accues = TRUE;`, 
      [id]
    );

    res.send(result.rows);
  } catch (error) {
    console.error('Error getting entity', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
server.get('/checkname/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1',[id]);
  
    if (result.rows.length > 0) {
      res.status(200).json({ statuse: true });
     
    } else {
      res.status(200).json({ statuse: false });
     
    }
    

  } catch (error) {
    console.error('Error getting name', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

server.post('/postnewuser', async (req, res) => {
  const {username, password} = req.body;
  
  
  try {

    const result = await pool.query(`
      INSERT INTO users (username,password) 
      VALUES ($1, $2 )
    `, [ username,password]);

    res.send('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Internal Server Error');
  }
});

server.get('/validate/:username/:password', async (req, res) => {
  const { username,password } = req.params;

  
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password =$2',[username,password]);
    
    if (result.rows.length > 0) {
      res.status(200).json({ statuse: true });
     
    } else {
      res.status(200).json({ statuse: false });
     
    }
    
    

  } catch (error) {
    console.error('Error getting password', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

server.get('/findowner/:roomname', async (req, res) => {
  const { roomname } = req.params;
  
  
  
  try {
      const result = await pool.query('SELECT owner FROM YourRooms WHERE roomname = $1', [roomname]);
      
      res.send(result.rows);
     
  } catch (error) {
      console.error('Error getting owner', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

    
    
server.delete('/removemessage', async (req, res) => {
  const { ID } = req.body;
  
  
  try {
      
      const result = await pool.query(`
      
          DELETE FROM calendarentity
          WHERE id = $1
      `, [ID]);

      res.send('Data Deleted successfully');
  } catch (error) {
      console.error('Error Deleting data:', error);
      res.status(500).send('Internal Server Error');
  }
});

server.get('/checkroom/:id', async (req, res) => {
  const { id } = req.params;
  

  try {
    const result = await pool.query('SELECT * FROM YourRooms WHERE roomname = $1',[id]);
    
    if (result.rows.length > 0) {
      res.status(200).json({ statuse: true });
     
    } else {
      res.status(200).json({ statuse: false });
     
    }
    

  } catch (error) {
    console.error('Error getting name', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

server.delete('/removecalander', async (req, res) => {
  const { ID } = req.body;

 
  
  try {

    
      await pool.query('BEGIN');

      await pool.query(`
      
          DELETE FROM roomsreq 
          WHERE room = $1
      `, [ID]);

      await pool.query(`
      
          DELETE FROM calendarentity 
          WHERE roomstring = $1
      `, [ID]);

      await pool.query(`
      
          DELETE FROM yourrooms 
          WHERE roomname = $1
      `, [ID]);

      await pool.query('COMMIT');

      res.send('calander deleted ');
  } catch (error) {
      console.error('Error Deleting calander:', error);
      res.status(500).send('Internal Server Error');
  }
});

server.delete('/rmuser', async (req, res) => {
  const { user,room} = req.body;

  
  try {
    console.log(user,room)

      await pool.query(`
      
          DELETE FROM roomsreq 
          WHERE requester = $1 AND room =$2
      `, [user, room]);




      res.send('user deleted ');
  } catch (error) {
      console.error('Error Deleting user:', error);
      res.status(500).send('Internal Server Error');
  }
});


server.listen(5004,()=>console.log('lising on port 5004'))


