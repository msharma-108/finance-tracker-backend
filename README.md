# Personal Finance Tracker - Backend

A RESTful API built with Node.js, Express.js, and MongoDB for managing personal financial transactions.

## 🚀 Features

- **CRUD Operations**: Create, Read, Update, Delete transactions
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **Input Validation**: Server-side validation for transaction data
- **Error Handling**: Comprehensive error handling and response formatting
- **CORS Support**: Cross-origin resource sharing for frontend integration
- **RESTful Design**: Clean API endpoints following REST principles

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Middleware**: CORS, Express JSON parser

## 📋 Prerequisites

Before running the backend, make sure you have:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd finance-tracker-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   touch .env
   ```

4. **Configure environment variables**
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/finance-tracker
   JWT_SECRET=your-secret-key
   ```


## 🏃‍♂️ Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Development mode**
   ```bash
   npm run dev
   ```

3. **Production mode**
   ```bash
   npm start
   ```





