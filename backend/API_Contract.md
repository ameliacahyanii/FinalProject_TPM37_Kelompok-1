# API Contract

This document outlines the API endpoints for the Hackathon 2025 Backend API.

## Base URL

The API is served at `http://localhost:3000` by default.

## Endpoints

### 1. Root Endpoint

- **URL**: `GET /`
- **Description**: Basic health check endpoint.
- **Response**:
    ```json
    {
    	"message": "Hackathon 2025 Backend API"
    }
    ```

### 2. Register Team

- **URL**: `POST /api/auth/register`
- **Description**: Registers a new team with a leader. Requires file uploads for CV and ID card.
- **Content-Type**: `multipart/form-data`
- **Request Body** (form data):
    - `name` (string, required): Team name (unique)
    - `password` (string, required): Password (min 8 chars, must include uppercase, lowercase, number, symbol)
    - `fullName` (string, required): Leader's full name
    - `email` (string, required): Leader's email (unique)
    - `whatsapp` (string, required): Leader's WhatsApp number (unique, min 9 digits)
    - `lineId` (string, required): Leader's Line ID (unique)
    - `githubId` (string, required): Leader's GitHub ID
    - `birthPlace` (string, required): Leader's birth place
    - `birthDate` (string, required): Leader's birth date (YYYY-MM-DD format, age >= 17)
    - `cvFile` (file, required): CV file (PDF/JPG/PNG)
    - `idCardFile` (file, required): ID card file (PDF/JPG/PNG)
- **Request Example** (form-data):
    ```
    name=TeamAwesome
    password=Password123!
    fullName=John Doe
    email=john@example.com
    whatsapp=1234567890
    lineId=johndoe123
    githubId=johndoe
    birthPlace=Jakarta
    birthDate=2000-01-01
    cvFile=<CV_FILE>
    idCardFile=<ID_CARD_FILE>
    ```
- **Success Response** (201):
    ```json
    {
    	"success": true,
    	"message": "Registrasi berhasil dengan file.",
    	"data": {
    		"teamName": "TeamAwesome",
    		"leaderName": "John Doe",
    		"files": {
    			"cv": "cv_1234567890.pdf",
    			"idCard": "idcard_1234567890.jpg"
    		}
    	}
    }
    ```
- **Error Responses**:
    - 400: Missing files, invalid age, weak password, duplicate team name/email
    - 500: Server error

### 3. Login Team

- **URL**: `POST /api/auth/login`
- **Description**: Authenticates a team and returns a JWT token.
- **Content-Type**: `application/json`
- **Request Body**:
    ```json
    {
    	"name": "TeamAwesome",
    	"password": "Password123!"
    }
    ```
- **Success Response** (200):
    ```json
    {
      "success": true,
      "message": "Login berhasil.",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    ```
- **Request Body**:
    ```json
    {
    	"username": "admin",
    	"password": "adminpass123"
    }
    ```
- **Success Response** (200):
    ```json
    {
    	"success": true,
    	"message": "Welcome Admin!",
    	"token": "jwt_token_here",
    	"role": "admin"
    }
    ```
- **Error Responses**:
    - 401: Invalid username or password
    - 500: Server error

### 5. Get User Dashboard

- **URL**: `GET /api/team/me`
- **Description**: Retrieves the authenticated team's dashboard data, including team and leader information.
- **Authentication**: Required (JWT token in Authorization header: `Bearer <token>`)
- **Headers**:
    - `Authorization`: `Bearer <jwt_token>`
- **Success Response** (200):
    ```json
    {
      "success": true,
      "message": "Berhasil mengambil data dashboard",
      "data": {
        "teamId": 1,
        "name": "TeamAwesome",
        "joinedAt": "2026-01-26T03:57:20.000Z",
        "leader": {
          "fullName": "John Doe",
          "email": "john@example.com",
          "whatsapp": "1234567890",
          "lineId": "johndoe123",
          "githubId": "johndoe",
          "birthDate": "2000-01-01T00:00:00.000Z",
          "cvUrl": "/uploads/cv_1234567890.pdf",
          "idCardUrl": "/uploads/idcard_1234567890.jpg"
      - 403: Token expired or invalid
      - 404: Team not found
      - 500: Server error
    ```

### 6. Get All Participants (Admin)

- **URL**: `GET /api/admin/participants`
- **Description**: Retrieves a list of all registered teams with their leader information. Supports search and sorting.
- **Authentication**: Required (JWT token with admin role in Authorization header: `Bearer <token>`)
- **Headers**:
    - `Authorization`: `Bearer <jwt_token>`
- **Query Parameters** (optional):
    - `search` (string): Search teams by name (partial match)
    - `sortBy` (string): Sort by 'name' or default 'createdAt'
    - `order` (string): Sort order 'asc' or 'desc' (for name), or 'oldest' for createdAt
- **Example URLs**:
    - `GET /api/admin/participants`
    - `GET /api/admin/participants?search=tim`
    - `GET /api/admin/participants?sortBy=name&order=asc`
    - `GET /api/admin/participants?search=team&sortBy=name&order=desc`
- **Success Response** (200):
    ```json
    {
      "success": true,
      "data": [
        {
          "id": 1,
          "teamName": "TeamAwesome",
          "leaderName": "John Doe",
          "email": "john@example.com",
          "registeredAt": "2026-01-26T03:57:20.000Z",
          "cvUrl": "/uploads/cv_1234567890.pdf",
          "idCardUrl": "/uploads/idcard_1234567890.jpg"
        },
        {
          "id": 2,
          "teamName": "TeamB",
          "leaderName": "Jane Smith",
          "email": "jane@example.com",
          "registeredAt": "2026-01-27T10:30:00.000Z",
          "cvUrl": "/uploads/cv_0987654321.pdf",
          "idCardUrl": "/uploads/idcard_0987654321.jpg"
    ```
- **URL Parameters**:
    - `id` (integer): Team ID to delete
- **Example**: `DELETE /api/admin/teams/1`
- **Success Response** (200):
    ```json
    {
    	"success": true,
    	"message": "Tim berhasil dihapus!"
    }
    ```
- **Error Responses**:
    - 400: Team ID not found or invalid
    - 401: Missing or invalid token
    - 403: Insufficient permissions (not admin)
    - 500: Server error

### 8. Edit Team (Admin)

- **URL**: `PUT /api/admin/teams/:id`
- **Description**: Updates team and leader information for a specific team.
- **Authentication**: Required (JWT token with admin role in Authorization header: `Bearer <token>`)
- **Headers**:
    - `Authorization`: `Bearer <jwt_token>`
- **Content-Type**: `application/json`
- **URL Parameters**:
    - `id` (integer): Team ID to update
- **Request Body**:
    ```json
    {
    	"teamName": "NewTeamName",
    	"fullName": "New Full Name",
    	"email": "newemail@example.com",
    	"whatsapp": "987654321"
    }
    ```
- **Example**: `PUT /api/admin/teams/1`
- **Request Example** (curl):
    ```bash
    curl -X PUT http://localhost:3000/api/admin/teams/1 \
      -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
      -H "Content-Type: application/json" \
      -d '{
        "teamName": "UpdatedTeamName",
        "fullName": "Updated Full Name",
        "email": "updated@example.com",
        "whatsapp": "987654321"
      }'
    ```
- **Request Example** (JavaScript with fetch):
    ```javascript
    fetch("http://localhost:3000/api/admin/teams/1", {
    	method: "PUT",
    	headers: {
    		Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    		"Content-Type": "application/json",
    	},
    	body: JSON.stringify({
    		teamName: "UpdatedTeamName",
    		fullName: "Updated Full Name",
    		email: "updated@example.com",
    		whatsapp: "987654321",
    	}),
    });
    ```
- **Success Response** (200):
    ```json
    {
    	"success": true,
    	"message": "Data Tim dan Peserta berhasil diupdate."
    }
    ```
- **Error Responses**:
    - 400: Invalid data, duplicate team name/email, or team ID not found
    - 401: Missing or invalid token
    - 403: Insufficient permissions (not admin)
    - 500: Server error

## Authentication

- JWT tokens are issued upon successful login for both participants and admins.
- Include the token in the `Authorization` header as `Bearer <token>` for protected routes.
- **Participant routes** (require participant role): `/api/team/me`
- **Admin routes** (require admin role): `/api/admin/*`

## Static Files

Static files are served from the `/public` directory at the root URL.

- Uploaded CV and ID card files are accessible at `/uploads/filename.ext`
- Example: `http://localhost:3000/uploads/cv.pdf`

## File Upload Requirements

- **CV File**: PDF, JPG, or PNG format
- **ID Card File**: PDF, JPG, or PNG format
- Maximum file size: Configured in multer settings (default: 5MB per file)
- Files are stored in `backend/public/uploads/` directory
