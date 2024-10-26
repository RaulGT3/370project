# Calendar Collaboration Web Application

## Overview
This application allows users to create and accept invitations to their calendars, facilitating the easy and efficient sharing of events on specific days.

## Features

### Polling Communication
- Shared updates to the calendar are regularly displayed between users.
- Users can request access to a team's calendar.
- Calendar owners can delete or remove users from their own calendars.

### Additional Features
- Login and registration page with persistent login functionality.
- The current day is always displayed, with the correct day, month, and year, and updates as you navigate through the calendar.
- A display of people in the room, the current calendar, and a list of rooms that updates accordingly when rooms are changed or deleted.

## Tools
- PostgreSQL
- Node.js
- Docker
- Express
- React
- JavaScript
- CSS/HTML

## Future Improvements
If I were to redo this project, I would implement WebSockets to create a better environment for real-time updates between users, effectively reducing latency.

### Installation
After cloning the project, ensure you have Docker and Node.js installed on your machine. Then, navigate to the root of the project directory and run the following command:

```bash
docker-compose up --build
