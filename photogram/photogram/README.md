# PhotoGram - Social Media Web Application

A modern social media platform built using React (React, Google Firebase). This application allows users to create profiles, post updates, follow other users, like and comment on posts, and engage in real-time messaging.

## Table of Contents

- Features
- Technologies
- Installation
- Usage
- Project Structure
- Environment Variables
- Contributing
- License

### Features

User authentication (register, login, logout) with Google Firebase
Create, edit, and delete posts
Like and comment on posts
Follow/unfollow users
Real-time chat using Socket.IO
User profile management (bio, profile picture)
Responsive design for mobile and desktop
News feed with posts from followed users

### Technologies

Frontend: React, Tailwind CSS, Redux Toolkit, FileUploader, shadCN
Backend: Google Firebase
Database: Google Firebase
Real-time Communication: Socket.IO
Authentication: JSON Web Tokens (JWT)
File Storage: Multer (for profile pictures and post images)
Deployment: (e.g., Vercel for frontend, Render/Heroku for backend, MongoDB Atlas for database)

### Installation

Clone the repository:
git clone https://github.com/NagendraBabuSadu/photogram/tree/main/photogram

#### Install dependencies:
- For the Application: `npm create vite@latest`

- For the Tailwind CSS: `npm install tailwindcss @tailwindcss/vite`

- For the frontend:cd frontend `npm install`

- Configure environment variables (see Environment Variables).

- Run the application: Start the frontend: `npm run dev`

- File Uploader: `npm i @uploadcare/react-uploader`

- #### ShadCN 
- ShadCN: components.json
`{
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "rsc": false,
  "tsx": false,
  "aliases": {
    "utils": "~/lib/utils",
    "components": "~/components"
  }
}`

- ShadCN: jsconfig.json
`{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
`


Open http://localhost:3000 in your browser to view the application.

### Usage

Register a new account or log in with existing credentials.
Update your profile with a bio and profile picture.
Create posts with text and images.
Follow other users to see their posts in your feed.
Like and comment on posts.
Use the chat feature to send real-time messages to other users.

### Project Structure
social-media-app/

├── frontend/                  
│   ├── src/
│   │   ├── components/        
│   │   ├── pages/             
│   │   ├── redux/              
│   │   ├── assets/             
│   │   └── App.js              
└── README.md                   

### Environment Variables
Create a .env file in the frontend with the following variables:
- VITE_APIKEY
- VITE_AUTHDOMAIN
- VITE_PROJECTID
- VITE_STORAGEBUCKET
- VITE_MESSAGINGSENDERID
- VITE_APPID
- PORT=5000




### Contributing

Fork the repository.
- Create a new branch (`git checkout -b feature/your-feature`).
- Make your changes and commit (`git commit -m "Add your feature`).
- Push to the branch (`git push origin feature/your-feature`).
- Open a pull request.

### License
This project is licensed under the MIT License.
