# Secure Authentication and Authorization System with Role-Based Access Control (RBAC)

## Description
This project implements a secure authentication system using JWT tokens for user management and authorization based on roles. The role-based access control (RBAC) mechanism ensures that users can only access resources they are authorized to, enhancing the overall security of the system.

### Key Features

* *Secure User Registration*: Users can create accounts securely, with password hashing for added protection.
* *Login and Logout*: Secure login and logout functionality using JWT tokens.
* *Role-Based Access Control (RBAC)*: User access is determined by their assigned role, ensuring they only interact with authorized resources.
* *Admin, User, and Manager Roles*: Three predefined roles with distinct permissions for added security and flexibility.

## Implementation Details

### System Design
The system utilizes a modular design, with separate components for authentication, authorization, and data storage. This allows for easy maintenance and updates, as well as improved scalability.

### Security Measures
* *Password Hashing*: Passwords are stored securely using the bcryptjs library.
* *JWT Tokens*: Secure JWT tokens are generated for each user session, ensuring that only authorized users can access resources.
* *RBAC*: The RBAC mechanism ensures that users can only access resources based on their assigned role.

### Technical Requirements

### Node.js
Version 14 or higher.

### Express.js
Version 4 or higher.

### MongoDB
Version 3 or higher.

### bcryptjs
For password hashing.

### jsonwebtoken
For JWT token management.

## Security Features

* *Secure Authentication*: Users are authenticated securely using JWT tokens.
* *Role-Based Access Control (RBAC)*: User access is determined by their assigned role, ensuring they only interact with authorized resources.
* *Password Hashing*: Passwords are stored securely using the bcryptjs library.


## Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 18.0.0


## Getting started
- Clone the repository
```
git clone  https://github.com/raviranjan2003/VRV-Security.git
cd VRV-Security
```
### Nodejs (server)
```
cd backend
```
- Install dependencies
```
npm install
```
- Run the project
```
nodemon  (recomended)
or
node app.js
```
  Navigate to `http://localhost:8000`

## APIs Endpoints
The folder structure of this app is explained below:

| Endpoints | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **/aut/sign-up**                 | Used for registering new users.|
| **/auth/sign-in**         | Used for signing in (authencate).|
| **/auth/sign-out**                  | Used for signing out.|
| **/auth/get-user**        | List all the users which is only visible to admin. 
| **/users/update-role/:id**      | Admin can update the role of users. 
| **/users/admin**              | Accessible to admin only.  
| **/users/manager**      | Accessible to admin and manager only.
| **/users/user**           | Accessible to all (admin, managers, user).

### React (client)
```
cd frontend
```
- Install dependencies
```
npm install
```
- Run frontend
```
npm start
```
Navigate to `http://localhost:3000`

## Routes
|Routes | Description|
| ----- | ---------- |
|**/**| Home route|
|**/sign-in**| Register new users.|
|**/sign-up**| Logging in.|
|**/admin**| Only accessible to admin.|
|**/manager**|Accessible to admin and manager.|
|**/user**| Accessible to all.|