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
- **Success Response** (201):
    ```json
    {
    	"success": true,
    	"message": "Registrasi berhasil dengan file.",
    	"data": {
    		"teamName": "TeamName",
    		"leaderName": "Full Name",
    		"files": {
    			"cv": "filename.pdf",
    			"idCard": "filename.jpg"
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
    	"name": "teamname",
    	"password": "password"
    }
    ```
- **Success Response** (200):
    ```json
    {
    	"success": true,
    	"message": "Login berhasil.",
    	"token": "jwt_token_here",
    	"role": "participant"
    }
    ```
- **Error Responses**:
    - 404: Invalid team name or password
    - 500: Server error

## Data Models

### Team

- `id` (int): Primary key
- `name` (string): Unique team name
- `password` (string): Hashed password
- `createdAt` (DateTime): Creation timestamp
- `updatedAt` (DateTime): Update timestamp
- `leader` (Leader): Associated leader

### Leader

- `id` (int): Primary key
- `fullName` (string): Full name
- `email` (string): Unique email
- `whatsapp` (string): Unique WhatsApp number
- `lineId` (string): Unique Line ID
- `githubId` (string): GitHub ID
- `birthPlace` (string): Birth place
- `birthDate` (DateTime): Birth date
- `cvUrl` (string): CV file path
- `idCardUrl` (string): ID card file path
- `isBinusian` (boolean): Whether the leader is a Binusian
- `teamId` (int): Foreign key to Team
- `team` (Team): Associated team

### Admin

- `id` (int): Primary key
- `username` (string): Unique username
- `password` (string): Password

## Static Files

Static files are served from the `/public` directory at the root URL.

## Authentication

- JWT tokens are issued upon successful login.
- Include the token in the `Authorization` header as `Bearer <token>` for protected routes (none currently implemented).</content>
  <parameter name="filePath">d:\Coding\BNCC_TPM_Final_Project\FinalProject_TPM37_Kelompok-1\backend\API_Contract.md
