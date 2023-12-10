
# Gifthive

As part of a Technigo Web Dev Bootcamp project, this project was created as the Final Project. It includes an API, containting several different routes for handling gift items, lists (hives) and users, as well as a frontend handling all user interactions.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file of the backend.

`MONGO_URL` - Get your Conncection String from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).

You will also need to add the following environment variables to your .env file of the frontend.

`VITE_BACKEND_API` - Add your own backend API deployment link
## API Reference

#### Show endpoints

```http
  GET /
```

| Description                |
| :------------------------- |
| Shows all available endpoints|

#### Regsiter a new user

```http
  POST /register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. **Unique**. The username of the new user. |
| `password`      | `string` | **Required**. The password for the new user |

#### Login a user

```http
  POST /login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. **Unique**. The username of the new user. |
| `password`      | `string` | **Required**. The password for the new user |

#### Get the dashboard/secret page

```http
  GET /dashboard
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Auth`      | `Header` | **Required**. Authorization Middleware checks for header "Auth" |
| `accessToken`      | `string` | **Required**. AccessToken comes from the logged in user |

#### Get all users that are in the database

```http
  POST /users
```
## View it live
Backend only: [![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)](https://gifthivebackend.onrender.com)

With frontend: [![Netlify Status](https://api.netlify.com/api/v1/badges/a058da08-22d3-4898-8913-fba7338c9a1c/deploy-status)](https://gifthive.netlify.app/)


## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-1DA1F2?style=for-the-badge&logo=ko-fi&logoColor=white)](https://portfolio-laura-lyckholm.netlify.app/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lauralyckholm/)

[![gitgub](https://img.shields.io/badge/github-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LauraLyckholm)