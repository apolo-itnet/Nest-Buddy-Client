# 🏠 Roommate Finder

A modern full-stack platform to help individuals find compatible roommates based on location, budget, lifestyle preferences, and interests.

---

## 🌐 Live Links

🔗 **Live Website**: https://roommate-finder-8c107.web.app  <br>
🔗 **Client GitHub**: https://github.com/apolo-itnet/Nest-Buddy-Client.git <br>
🔗 **Server GitHub**: https://github.com/apolo-itnet/Nest-Buddy-Server

---

## 🧪 How to Run Locally

> Make sure you have **Node.js**, **MongoDB**, and **npm** installed.

### 1. Clone & Run the Client

```bash
git clone https://github.com/your-username/roommate-finder-client.git
cd roommate-finder-client
npm install
npm run dev
```


### 2. Clone & Run the Server


```bash
git clone https://github.com/your-username/roommate-finder-server.git
cd roommate-finder-server
npm install
npm start
```

### 3. Setup .env Files
Set environment variables in both client and server based on the examples below:

**1. Client .env**
```
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
```
**2. Server .env**
```
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/roommateDB
JWT_SECRET=your_secret_key
```

--- 
### ✨ Key Features
- 🔐 <b>User Authentication</b> : Email/password & Google login using Firebase Auth.
- 📝 <b>Add/Edit/Delete Posts </b>: Authenticated users can manage their own roommate listings.
- 📄 <b> Browse Listings</b>: See all active roommate requests in a searchable, filterable table.
- ❤️ <b> Like & Reveal</b>: Like posts to reveal the contact info (disabled for own posts).
- 🌙 <b> Theme Toggle</b>: Smooth switch between light & dark themes.
- 🎨 <b> Modern UI</b>: TailwindCSS + DaisyUI powered responsive UI for all devices.
- 🔒 <b> Protected Routes</b>: Only logged-in users can access certain pages.
- 🔥 <b> Real-time Feedback</b>: Success and error messages via Toast & SweetAlert.
- 💬 <b> Lottie & Typewriter Effects</b>: For a more engaging UI.
- 🧭 <b> 404 & Loader States</b>: Custom not-found and loading pages for better UX.

---
### 📦 Installed Packages
<h4>Client: </h4>  
<li> react</li>
<li>react-router-dom </li>
<li>firebase </li>
<li> axios</li>
<li>tailwindcss, daisyui, aos, swiper </li>
<li>react-toastify, react-icons, sweetalert2 </li>
<li>lottie-react, typewriter-effect </li>

<h4>Server: </h4>  
<li> express</li>
<li>cors </li>
<li>dotenv </li>
<li>mongoose </li>
<li> jsonwebtoken</li>
<li> cookie-parser</li>

---
### 🔐 Environment Variables
**<h4>Client:</h4>**

```
VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain
```
**<h4>Server:</h4>**

```
DB_USER=yourMongoUser
DB_PASS=yourMongoPass
```
---
### 🚀 Notable Routes
| Route                 | Description                          | Protected |
| --------------------- | ------------------------------------ | --------- |
| `/`                   | Home Page with hero slider           | ❌         |
| `/login`, `/register` | Auth pages                           | ❌         |
| `/add-roommate`       | Add new listing                      | ✅         |
| `/my-listings`        | View & manage own listings           | ✅         |
| `/details/:id`        | Roommate post detail view            | ✅         |
| `/like/:id`           | Like functionality with reveal logic | ✅         |

---
### ✏️ CRUD Features
**✅ Create** : Add a new roommate post. <br>
**✅ Read** : View all public posts & individual details. <br>
**✅ Update** : Edit own posts only. <br>
**✅ Delete** : Delete your own roommate listing. <br>

---
### 📝 Extra Notes
- Users **cannot like** their own posts. <br>
- **Contact numbers reveal** only after liking a post. <br>
- Proper routing ensures **no page refresh issues.** <br>
- **Password validations** include uppercase, symbol, and length checks. <br>

---
### 💡 Inspiration
This project was inspired by real-world roommate-finding struggles. <br> 
The goal was to create a clean, secure, and efficient platform that helps people quickly connect with compatible roommates.

---
### 📬 Submission
This project is submitted as part of Assignment-10 of the MERN Stack Developer Course.

---
### 👨‍💻 Developer Info
**Apolo Barua Apurbo**   <br> 
💼 MERN Stack Web Developer  <br> 
📧 **Email**: apolo.itnet@gmail.com.com  <br> 
📍 **Location**: Bangladesh  <br> 


