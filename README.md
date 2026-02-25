
**📚 Knowledge Sharing Platform with AI Assist**

**A Knowledge Sharing Platform where users can create, share, and discover technical articles, with AI-assisted features to enhance the writing and reading experience. Think Medium + StackOverflow-lite + AI assist.**

**🧭Features**
User Roles

Registered Users:

Create, edit, and delete their own articles

View and search all public articles

AI-assisted writing support

Public Users:

View and search published articles

Read full article content

**Authentication**

**JWT-based authentication**

Signup (Username, Email, Password)

Login (Email + Password)

**Logout (Token invalidation)**

Article Management

Create Article: Title, Category, Rich Text, Tags, Summary

**Edit/Delete Article: Only by author**

Read Articles: List view + single view

Search & filter by title, content, tags, category

AI-Assisted Features

**AI Writing Assistant: Improve grammar, rewrite content, suggest better title**

AI Summary Generator: Auto-generate short summary for article cards

Optional: AI tag suggestions based on content

UI & Navigation

Home page with article list, search & filter

Create/Edit Article page with rich text editor + AI tools

User Dashboard: Manage own articles

Authentication pages: Login / Signup

Navbar: Home | New Article | My Articles | Login/Logout

**🛠️ Technical Stack**

Frontend:

**ReactJS (Vite)**

React Router v6

Axios

**React Quill (Rich Text Editor)**

Backend:

**Node.js + Express**

MySQL / MySQL2

**JWT Authentication**

MVC architecture (Models, Controllers, Routes)

**AI Tools Used:**

ChatGPT: Assisted with code generation, API design, controller logic, and frontend UI suggestions.

GitHub Copilot: Suggested repetitive boilerplate and refactored code snippets.

**🏗️ Project Structure**
**Backend (MVC)**
backend/
│
├── controllers/
│   ├── authController.js
│   └── articleController.js
├── models/
│   └── articleModel.js
├── routes/
│   ├── authRoute.js
│   └── articleRoute.js
├── middleware/
│   └── authMiddleware.js
├── config/
│   └── DB.js
├── server.js
├── app.js
└── .env
**Frontend (React)**
frontend/
│
├── src/
│   ├── api/
│   │   └── axios.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── CreateArticle.jsx
│   │   └── Dashboard.jsx
│   ├── components/
│   │   └── Navbar.jsx
│   ├── App.jsx
│   └── main.jsx
⚙️ Setup Instructions
Backend

**Install dependencies**

cd backend
npm install

Create .env file

PORT=5000
DB_HOST=localhost
DB_USER=<your_mysql_user>
DB_PASSWORD=<your_mysql_password>
DB_NAME=mindbrowserDB
JWT_SECRET=super_secret_jwt_key_123

**Run server**

node server.js
# or
nodemon server.js
Frontend

Install dependencies

cd frontend
npm install

**Run frontend**

npm run dev

Open browser at http://localhost:5173 (Vite default port)

**🔑 API Endpoints**
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
Articles
Method	Endpoint	Description
GET	/api/articles	Get all articles
GET	/api/articles/:id	Get single article by ID
GET	/api/articles/my/user	Get all articles by logged-in user
POST	/api/articles	Create article (auth required)
PUT	/api/articles/:id	Update article (auth & ownership)
DELETE	/api/articles/:id	Delete article (auth & ownership)

**Note: All protected endpoints require Authorization: Bearer <JWT> header.**
