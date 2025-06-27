# AI Interviewer

Access frontend code at: https://github.com/HarshitBamotra/ai-interviewer-frontend

Backend Deployment: https://ai-interviewer-backend-1.onrender.com

Frontend Deployment: https://ai-interviewer-frontend-xw2c.onrender.com

## Overview

This is the backend for a AI interviewer. It let's user create interviewer by providing the company name, interview round, and any other additional information.

1. Create Interviewers
2. Chat like you are in a real interview
3. Get prepared for your upcoming interviews.
---

## API Endpoints

**Register:** `POST: /api/v1/auth/register`
```bash
Sample Request
{
    "username":"braincells",
    "email":"harshitbamotra@gmail.com",
    "password":"password",
    "image":<file upload>
}

Sample Response
{
    "success": true,
    "message": "User created successfully",
    "err": {},
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTk5ODFhMzE3ZTA2ZDQ1ZGRjNGE3YyIsImlhdCI6MTc1MDcwMjEwNywiZXhwIjoxNzUxMzA2OTA3fQ.mI6G1caSUn0v5hNfv3Fx6dGSdziGURXVbfPko-QZcMI",
        "user": {
            "id": "6859981a317e06d45ddc4a7c",
            "username": "braincells",
            "email": "harshitbamotra@gmail.com",
            "profileImage": null
        },
        "isNewUser": true
    }
}
```

**Login:** `POST /api/v1/auth/login`
```bash
Sample Request
{
    "email":"harshitbamotra@gmail.com",
    "password":"password"
}

Sample Response
{
    "success": true,
    "message": "Login Successful",
    "err": {},
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTk5ODFhMzE3ZTA2ZDQ1ZGRjNGE3YyIsImlhdCI6MTc1MDcwMjE5NywiZXhwIjoxNzUxMzA2OTk3fQ.09KJ9wkoFSaBZBLLztn4tQQ1mHQYEk-jBvI9fzc71jM",
        "user": {
            "id": "6859981a317e06d45ddc4a7c",
            "username": "braincells",
            "email": "harshitbamotra@gmail.com"
        }
    }
}
```


**Update User:** `PUT /api/v1/auth/me`
```bash
Sample Request
{
    "username":"brainy",
    "image":<file upload>
}
Sample Response
{
    "success": true,
    "message": "Character Created Successfully",
    "err": {},
    "data": {
        "_id": "6859981a317e06d45ddc4a7c",
        "username": "brainy",
        "email": "harshitbamotra@gmail.com",
        "password": "$2b$10$j2bsUxFyOSWeyyJi8BoB1OfWL0MKYugnN75vVoCNeJelIURmXNhTy",
        "profileImage": null,
        "createdAt": "2025-06-23T18:08:26.992Z",
        "__v": 0
    }
}
```
**Get User:** `GET /api/v1/auth/me`
```bash
Sample Request
{
    ADD BEARER TOKEN
}

Sample Response
{
    "success": true,
    "message": "User fetched successfully",
    "err": {},
    "data": {
        "id": "6859981a317e06d45ddc4a7c",
        "username": "braincells",
        "email": "harshitbamotra@gmail.com",
        "profileImage": null
    }
}
```
**Create Character:** `POST /api/v1/character`
```bash
Sample Request (Add bearer token)
{
    "companyName":"Amazon",
    "interviewRound":"Technical",
    "additionalInformation":""
}

Sample Response
{
    "success": true,
    "message": "Character Created Successfully",
    "err": {},
    "data": {
        "companyName": "Amazon",
        "interviewRound": "Technical",
        "additionalInformation": "",
        "systemPrompt": "You are an interviewer at Amazon, taking my interview. The current round is Technical. This is the additional information: . You always have to stay in character. Never breaking the fourth wall",
        "user": "6859981a317e06d45ddc4a7c",
        "conversationHistory": [],
        "_id": "68599a8b317e06d45ddc4a83",
        "__v": 0
    }
}
```
**Get Characters:** `GET /api/v1/character`
```bash
Sample Request (Add bearer token)
{

}

Sample Response
{
    "success": true,
    "message": "Characters Fetched Successfully",
    "err": {},
    "data": [
        {
            "_id": "68599a8b317e06d45ddc4a83",
            "companyName": "Amazon",
            "interviewRound": "Technical",
            "additionalInformation": "",
            "systemPrompt": "You are an interviewer at Amazon, taking my interview. The current round is Technical. This is the additional information: . You always have to stay in character. Never breaking the fourth wall",
            "user": "6859981a317e06d45ddc4a7c",
            "conversationHistory": [],
            "__v": 0
        }
    ]
}
```
**Get Character:** `GET /api/v1/character/:characterId`
```bash
Sample Request (Add bearer token)
{

}

Sample Response
{
    "success": true,
    "message": "Character Fetched Successfully",
    "err": {},
    "data": {
        "_id": "68599a8b317e06d45ddc4a83",
        "companyName": "Amazon",
        "interviewRound": "Technical",
        "additionalInformation": "",
        "systemPrompt": "You are an interviewer at Amazon, taking my interview. The current round is Technical. This is the additional information: . You always have to stay in character. Never breaking the fourth wall",
        "user": "6859981a317e06d45ddc4a7c",
        "conversationHistory": [],
        "__v": 0
    }
}
```
**Send Message:** `POST /api/v1/chat/:characterId`
```bash
Sample Request (Add bearer token)
{
    "message":"Good Evening Sir"
}

Sample Response
{
    "success": true,
    "message": "Received response successfully",
    "err": {},
    "data": {
        "response": "Good evening. Thank you for joining me tonight. I'm [Your Interviewer Name], a Software Development Engineer here at Amazon. It's a pleasure to meet you.\n\nBefore we dive in, just to confirm, you're [Your Name]?\n\n(Pause for confirmation)\n\nAlright, great. So, to give you a brief overview of this interview, it's going to be primarily focused on your technical skills and problem-solving abilities. I'll present you with a programming challenge, and I'll be evaluating your approach, your code, your communication, and your overall understanding of the underlying concepts.\n\nDo you have any questions for me before we begin?\n",
        "timestamp": 1750703181962
    }
}
```
**Get Chat History:** `GET /api/v1/chat/:characterId/history`
```bash
Sample Request (Add bearer token)
{
    
}

Sample Response
{
    "success": true,
    "message": "Chats Fetched Successfully",
    "err": {},
    "data": [
        {
            "role": "user",
            "content": "Good Evening Sir",
            "timestamp": "2025-06-23T18:26:21.892Z",
            "_id": "68599c4d317e06d45ddc4a91"
        },
        {
            "role": "model",
            "content": "Good evening. Thank you for joining me tonight. I'm [Your Interviewer Name], a Software Development Engineer here at Amazon. It's a pleasure to meet you.\n\nBefore we dive in, just to confirm, you're [Your Name]?\n\n(Pause for confirmation)\n\nAlright, great. So, to give you a brief overview of this interview, it's going to be primarily focused on your technical skills and problem-solving abilities. I'll present you with a programming challenge, and I'll be evaluating your approach, your code, your communication, and your overall understanding of the underlying concepts.\n\nDo you have any questions for me before we begin?\n",
            "timestamp": "2025-06-23T18:26:21.894Z",
            "_id": "68599c4d317e06d45ddc4a92"
        }
    ]
}
```
**Delete Character:** `DELETE /api/v1/character/:characterId`
```bash
Sample Request (Add bearer token)
{

}

Sample Response
{
    "success": true,
    "message": "Character Deleted Successfully",
    "err": {},
    "data": {
        "_id": "68599a8b317e06d45ddc4a83",
        "companyName": "Amazon",
        "interviewRound": "Technical",
        "additionalInformation": "",
        "systemPrompt": "You are an interviewer at Amazon, taking my interview. The current round is Technical. This is the additional information: . You always have to stay in character. Never breaking the fourth wall",
        "user": "6859981a317e06d45ddc4a7c",
        "conversationHistory": [
            {
                "role": "user",
                "content": "Good Evening Sir",
                "timestamp": "2025-06-23T18:26:21.892Z",
                "_id": "68599c4d317e06d45ddc4a91"
            },
            {
                "role": "model",
                "content": "Good evening. Thank you for joining me tonight. I'm [Your Interviewer Name], a Software Development Engineer here at Amazon. It's a pleasure to meet you.\n\nBefore we dive in, just to confirm, you're [Your Name]?\n\n(Pause for confirmation)\n\nAlright, great. So, to give you a brief overview of this interview, it's going to be primarily focused on your technical skills and problem-solving abilities. I'll present you with a programming challenge, and I'll be evaluating your approach, your code, your communication, and your overall understanding of the underlying concepts.\n\nDo you have any questions for me before we begin?\n",
                "timestamp": "2025-06-23T18:26:21.894Z",
                "_id": "68599c4d317e06d45ddc4a92"
            }
        ],
        "__v": 1
    }
}
```

---
## Installation and Setup

### 1. Clone the repository:
```bash
git clone https://github.com/HarshitBamotra/ai-interviewer-backend.git
```
### 2. Change directory
```bash
cd ai-interviewer-backend
```
### 3. Install Dependencies
```bash
npm install
```

### 4. Set up environment variables

**Sample `.env` file**
```env
PORT = 3000
DB_URL = ""

GEMINI_API_KEY = ""
AI_MODEL = "gemini-2.0-flash"

JWT_SECRET = ""


CLOUDINARY_CLOUD_NAME = ""
CLOUDINARY_API_KEY = ""
CLOUDINARY_API_SECRET = ""
```

### 5. Start the Application

```bash
npm start
```
---
## Testing

#### Tools Used 
- JEST
- SUPERTEST

#### Testing Commands
```bash
npx jest
npx jest --coverage
npx jest --watch
```

![Test Coverage Image](https://github.com/HarshitBamotra/ai-interviewer-backend/blob/master/github-images/test-coverage.png?raw=true)

---
## CI/CD Integration

### Keploy Dashboard
![Keploy Dashboard](https://github.com/HarshitBamotra/ai-interviewer-backend/blob/master/github-images/keploy-dashboard.png?raw=true)

### GitHub Actions
![Actions 1](https://github.com/HarshitBamotra/ai-interviewer-backend/blob/master/github-images/github-actions1.png?raw=true)

![Actions 2](https://github.com/HarshitBamotra/ai-interviewer-backend/blob/master/github-images/github-actions2.png?raw=true)

