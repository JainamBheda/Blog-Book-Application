
# Blog Book Backend

This repository contains the backend for the **Blog Book** application. It is built with **Node.js** and **Express**, following the **MVC** architecture.

## Features

## API Endpoints

### User Authentication (`/user` routes)

| Method | Endpoint       | Description                        |
|--------|----------------|----------------------------------|
| GET    | `/user/signup` | Render user signup page           |
| POST   | `/user/signup` | Register new user with fullname, email, and password |
| GET    | `/user/signin` | Render user signin (login) page  |
| POST   | `/user/signin` | Log in user with email and password, returns JWT in cookie |
| GET    | `/user/logout` | Logout user by clearing JWT cookie and redirect to signin |

Below is basic UI <table>
  <tr>
    <td><img src="Screenshot/Screenshot%202025-08-09%20143339.png" alt="Sign Up" width="300"/></td>
    <td><img src="https://github.com/JainamBheda/Blog-Book-Application/raw/main/Screenshot/Screenshot%202025-08-09%20143349.png" alt="Log In" width="300"/></td>
  </tr>
</table>


---

### Blog Management (`/blog` routes)

| Method | Endpoint             | Description                          |
|--------|----------------------|------------------------------------|
| GET    | `/blog/add-new`      | Render page to add new blog (requires login) |
| POST   | `/blog/`             | Create new blog post (requires login) with title, body, and cover image upload (via Multer) |
| GET    | `/blog/:id`          | Get blog details by blog ID, including author and comments |
| POST   | `/blog/comment/:blogId` | Add comment to a blog post (requires login) with comment content |

Below is Basic UI 
![HomePage](https://github.com/JainamBheda/Blog-Book-Application/blob/main/Screenshot/Screenshot%202025-08-09%20143506.png)
<p float="left">
  <img src="https://github.com/JainamBheda/Blog-Book-Application/raw/main/Screenshot/Screenshot%202025-08-09%20143614.png" alt="Comments" width="300" style="margin-right:10px;"/>
  <img src="https://github.com/JainamBheda/Blog-Book-Application/raw/main/Screenshot/Screenshot%202025-08-09%20150944.png" alt="Add Blog" width="300"/>
</p>


---


- Passwords are securely encrypted using **bcrypt** before storing in the database  
- Upload blog cover photos using **Multer** middleware  
- Data persistence using **MySQL** database with **Sequelize** ORM  
- Basic testing UI implemented with **EJS** templates to interact with API endpoints  


## Tech Stack

Here are the main technologies used in this project:

<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=json-web-tokens" alt="JWT" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" alt="Sequelize" />
  <img src="https://img.shields.io/badge/Multer-007ACC?style=for-the-badge" alt="Multer" />
  <img src="https://img.shields.io/badge/EJS-2C3A3A?style=for-the-badge&logo=ejs&logoColor=white" alt="EJS" />
  <img src="https://img.shields.io/badge/bcrypt-23395d?style=for-the-badge&logo=devicon-bcrypt&logoColor=white" alt="bcrypt" />
</p>



## Conclusion 

Blog Book is a secure Node.js backend for blogging with JWT auth, MySQL, image uploads, and RESTful APIs. Built with MVC and tested via EJS UI, it’s perfect for learning backend or starting your blog app. Star and contribute!

## Thanks You !!!


*Made by JAINAM BHEDA*
