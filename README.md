# Authentication-and-Role Based Access Control

This project uses Node.js & MongoDB to support basic User Authentication (Registation, Login) & Authorization with JSONWebToken (JWT).  
Read more about [session-vs-token-based-authentication.](https://sherryhsu.medium.com/session-vs-token-based-authentication-11a6c5ac45e)  

## Technologies:
 * bcryptjs 
 * express
 * jsonwebtoken
 * mongoose
 
## Available Scripts

In the project directory, you can run:

### `npm i`

to setup the environnement

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Flow

User can signup new account, or login with email & password.
The user has access to protected resources or not based on his role (admin, supervisor or user)    
NB: admin credentiels (email:azerty90@gmail.com, password:Az123456) were added manually to the db  

### 
Methods | Urls | Actions
------------ | ------------- | -------------
 POST	 | /api/signUp	 | signup new account
 POST	 | /api/signIn	 | login an account
 GET	 | /api/homeBoard	 | retrieve home board content
 GET	 | /api/adminBoard	 | retrieve admin board content
 GET	 | /api/supervisorBoard	 | retrieve supervisor board content
 GET	 | /api/userBoard	 | retrieve user board content
 PUT	 | /api/updateProfile	 | update profile (email only) 
 GET	 | /api/getAllUsers	 | retreive all users (available only for admin and supervisor roles)
 GET	 | /api/getAllSupervisors	 | retreive all supervisors (available only for admin)
 GET	 | /api/getAllRoles	 | retreive all users (available only for admin)
 PUT	 |  /api/addSupervisor | add supervisor role to a regular user (available only for admin)
 PUT	 |  /api/removeSupervisor | remove role supervisor (available only for admin)

### [The working front-end for this back-end](https://github.com/Sabri0o/react_logUp_logIn_logOut)





