# Golf Event Website

This is a website for organizing golf events, built with React for the frontend, Node.js and Express for the backend, and MongoDB as the database. The website allows users to create, edit, delete, and view golf game information.

## Features

- **Create Games**: Users can select a date, time, course, prices, and remarks to create a new game.
- **View All Games**: Users can view all created games in a list format.
- **Edit Games**: Users can edit existing game information while retaining the original data.
- **Delete Games**: Users can delete games that are no longer needed.
- **Time Format**: Time is displayed in 24-hour format.
- **Date Format**: Dates are displayed in Year/Month/Day format.
- **Automatic Deletion of Expired Games**: Automatically checks and deletes expired games daily.
- **Responsive Design**: The website displays well on different devices.

## Tech Stack

- **Frontend**:
  - React
  - Axios (for API requests)
  
- **Backend**:
  - Node.js
  - Express
  - MongoDB (interacting with the database via Mongoose)
  