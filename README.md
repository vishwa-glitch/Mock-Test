# Mock Test API

This project is a **Mock Test API** built with **Node.js**, **TypeScript**, and **MongoDB**. It provides endpoints for creating and managing mock tests while ensuring that users do not receive duplicate questions across multiple tests.  

## Features  

- Create users, questions, and mock tests.  
- Ensure unique questions per user for multiple mock tests.  
- Track questions already answered by each user.  
- RESTful API design with TypeScript.  

---

## Prerequisites  

- **Node.js** (v16+ recommended)  
- **npm** (v7+ recommended)  
- **MongoDB**  

---

## Installation  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/vishwa-glitch/Mock-Test
   cd src
   ```  

2. Install dependencies:  
   ```bash  
   npm install  
   ```  

3. Set up environment variables:  
   Create a `.env` file in the root directory and add the following values:  
   ```env  
   PORT=3000  
   MONGO_URI=mongodb://localhost:27017/mock_test_api  
   ```  

4. Start the server:  
   ```bash  
   npm run dev  
   ```  

The server will run at `http://localhost:3000`.

---

## Database Schema  

### Collections  

1. **Users**  
   - `_id`: ObjectId  
   - `name`: string  
   - `email`: string  
   - `answeredQuestions`: Array of ObjectId (references `Questions`)  

2. **Questions**  
   - `_id`: ObjectId  
   - `question`: string  
   - `options`: array of strings  
   - `answer`: string  

3. **MockTests**  
   - `_id`: ObjectId  
   - `userId`: ObjectId (references `Users`)  
   - `questions`: Array of ObjectId (references `Questions`)  
   - `createdAt`: Date  

---

## API Endpoints  

### **Users**  

#### Create a User  
**POST** `/api/users`  
- Request Body:  
  ```json  
  {  
    "name": "John Doe",  
    "email": "john.doe@example.com"  
  }  
  ```  
- Response:  
  ```json  
  {  
    "message": "User created successfully",  
    "data": {  
      "id": "USER_ID"  
    }  
  }  
  ```  

---

### **Questions**  

#### Add Questions  
**POST** `/api/questions`  
- Request Body:  
  ```json  
  {  
    "question": "What is 2 + 2?",  
    "options": ["1", "2", "3", "4"],  
    "answer": "4"  
  }  
  ```  
- Response:  
  ```json  
  {  
    "message": "Question added successfully",  
    "data": {  
      "id": "QUESTION_ID"  
    }  
  }  
  ```  

---

### **Mock Tests**  

#### Generate a Mock Test  
**POST** `/api/mock-tests`  
- Request Body:  
  ```json  
  {  
    "userId": "USER_ID",  
    "numberOfQuestions": 5  
  }  
  ```  
- Response:  
  ```json  
  {  
    "message": "Mock test created successfully",  
    "data": {  
      "mockTestId": "MOCK_TEST_ID",  
      "questions": [  
        { "id": "QUESTION_ID", "question": "What is 2 + 2?", "options": ["1", "2", "3", "4"] }  
      ]  
    }  
  }  
  ```  

## Folder Structure  

```  
project  
│  
├── src  
│   ├── controllers  
│   │   └── mockTestController.ts  
│   ├── interfaces  
│   │   └── models.ts  
│   ├── models  
│   │   ├── MockTest.ts  
│   │   ├── Question.ts  
│   │   └── User.ts  
│   ├── routes  
│   │   └── mockTestRoutes.ts  
│   ├── services  
│   │   └── mockTestService.ts  
│   └── app.ts  
│  
├── package.json  
├── tsconfig.json  
├── .gitignore  
├── README.md  
└── .env  
```  

---

## Scripts  

- **Start Development Server:**  
  ```bash  
  npm run dev  
  ```  

- **Build for Production:**  
  ```bash  
  npm run build  
  ```  
 

