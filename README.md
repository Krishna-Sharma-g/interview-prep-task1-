# Mini Twitter Clone

A simple Twitter-like application built with React, Node.js, Express, and MongoDB. This application allows users to post notes, like/unlike posts, and switch between dark and light modes.

## Features

### Core Features
- Create, read, and delete notes
- Like and unlike functionality
- Pagination for better performance
- Responsive design for all devices

### UI/UX Features
- Dark/Light Mode Toggle
  - Seamless switching between dark and light themes
  - Persistent theme preference
  - Optimized color schemes for both modes
  - Automatic system theme detection

### Like System
- Like/Unlike toggle functionality
- Real-time like count updates
- Visual feedback for liked posts
- Optimistic UI updates

## Tech Stack

### Frontend
- React.js
- Material-UI (MUI)
- Axios for API calls
- Environment variables for configuration

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mini-twitter
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
```

5. Create a `.env` file in the frontend directory:
```
VITE_API_URL=http://localhost:5000
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

### Posting Notes
1. Enter your name in the "Your Name" field
2. Write your note in the text area
3. Click "Post Note" to publish

### Like/Unlike Posts
- Click the thumbs up icon to like a post
- Click again to unlike
- The like count updates in real-time

### Dark/Light Mode
- Click the brightness icon in the top-right corner to toggle between dark and light modes
- The theme preference is saved in your browser

## API Endpoints

### Notes
- `GET /notes` - Get all notes (paginated)
- `POST /notes` - Create a new note
- `DELETE /notes/:id` - Delete a note
- `PATCH /notes/:id/like` - Like a note
- `PATCH /notes/:id/unlike` - Unlike a note

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
