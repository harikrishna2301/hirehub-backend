HireHub – Job Portal Backend (MERN)

HireHub is a role-based job portal backend built using Node.js, Express, MongoDB, and JWT authentication.
It allows recruiters to post jobs and candidates to apply securely, with full role-based access control.

🚀 Features
🔐 Authentication & Authorization

User registration and login

Password hashing using bcrypt

JWT-based authentication

Role-based access control (Recruiter / Candidate)

👨‍💼 Recruiter Features

Post new jobs

View applicants for posted jobs

Recruiter dashboard with job & application statistics

👤 Candidate Features

View available jobs

Apply for jobs

Candidate dashboard showing applied jobs

🛠 Tech Stack

Backend: Node.js, Express.js

Database: MongoDB (Atlas)

Authentication: JWT, bcrypt

Tools: Postman, Nodemon

📂 Project Structure
server/
│── controllers/
│   ├── authController.js
│   ├── jobController.js
│   ├── dashboardController.js
│
│── routes/
│   ├── authRoutes.js
│   ├── jobRoutes.js
│   ├── dashboardRoutes.js
│
│── models/
│   ├── User.js
│   ├── Job.js
│   ├── Application.js
│
│── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│
│── server.js
│── .env

🔐 API Overview
Auth APIs

POST /api/auth/register

POST /api/auth/login

Job APIs

POST /api/jobs → Recruiter only

GET /api/jobs → Public

POST /api/jobs/:id/apply → Candidate only

Dashboard APIs

GET /api/dashboard/recruiter → Recruiter dashboard

GET /api/dashboard/candidate → Candidate dashboard

▶️ How to Run Locally
cd server
npm install
npm run dev


Create a .env file inside the server folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

📌 Future Enhancements

Frontend using React

Resume upload feature

Admin dashboard

Job search and filters

👤 Author

Harikrishna Bhyrraju
Aspiring Full Stack Developer

✅ Project Status

✔ Backend completed
✔ Authentication & Authorization implemented
✔ Dashboards working
✔ Ready for frontend integration

⭐ Why this README is HR-ready

Clean structure

No duplication

Clear features

Shows real-world backend understanding

Easy to scan in 30 seconds