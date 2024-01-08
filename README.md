
# Gifthive

As part of the Technigo Web Dev Bootcamp, this project was created as the Final Project. It includes an API, containting several different routes for handling gift items, lists (hives) and users, as well as a frontend handling all user interactions.

Gifthive is the one and only place you need, to save all gift ideas for your loved ones. You can add, manage, and view all of your gift ideas in one place, so that you never forget what you where supposed to get dad for Father's day, or your sister on her next birthday!

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file of the backend.

`MONGO_URL` - Get your Conncection String from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).

You will also need to add the following environment variables to your .env file of the frontend.

`VITE_BACKEND_API` - Add your own backend API deployment link

## API Reference

### Show all endpoints

```http
  GET /
```

| Description                |
| :------------------------- |
| Shows all available endpoints|

### /user-routes

#### Get the all users (only used in development, is commented out so not currently visible on the "/" route)

```http
  GET /users
```

#### Get the dashboard/secret page

```http
  GET /dashboard
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Auth`      | `Header` | **Required**. Authorization Middleware checks for header "Auth" |
| `accessToken`      | `string` | **Required**. AccessToken comes from the logged in user |

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

#### Update user information

```http
  PUT /users/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Auth`      | `Header` | **Required**. Authorization Middleware checks for header "Auth" |
| `accessToken`      | `string` | **Required**. AccessToken comes from the logged in user |
| `id`      | `string` | The userId of the user |
| `username`      | `string` | The new username |
| `password`      | `string` | The new password |

#### Delete a user

```http
  DELETE /users/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Auth`      | `Header` | **Required**. Authorization Middleware checks for header "Auth" |
| `accessToken`      | `string` | **Required**. AccessToken comes from the logged in user |
| `id`      | `string` | The userId of the user to be deleted |

### /gift-routes

#### Get all hives

```http
  GET /hives/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Auth`      | `Header` | **Required**. Authorization Middleware checks for header "Auth" |
| `accessToken`      | `string` | **Required**. AccessToken comes from the logged in user |

#### Get individual hive

```http
  GET /hives/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Auth`      | `Header` | **Required**. Authorization Middleware checks for header "Auth" |
| `accessToken`      | `string` | **Required**. AccessToken comes from the logged in user |
| `id`      | `string` | The hiveId |

#### Post gift to a hive

```http
  POST /gifts
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Auth`      | `Header` | **Required**. Authorization Middleware checks for header "Auth" |
| `accessToken`      | `string` | **Required**. AccessToken comes from the logged in user |
| `hiveId`      | `string` | **Required**. The hiveId in which the gift gets added |
| `gift`      | `string` | **Required**. The name of the gift |
| `tags`      | `array` | **Optional**. Tags that could be added to the gift, separated by comma |
| `bought`      | `boolean` | **Optional**. Status of bought or not |

#### Update a gifts information

```http
  PUT /gifts/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Auth`      | `Header` | **Required**. Authorization Middleware checks for header "Auth" |
| `accessToken`      | `string` | **Required**. AccessToken comes from the logged in user |
| `gift`      | `string` | **Optional**. The new name of the gift |
| `tags`      | `array` | **Optional**. The new tag names |
| `bought`      | `boolean` | **Optional**. The new status of bought |

#### Add new hive

```http
  POST /hives
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Auth`      | `Header` | **Required**. Authorization Middleware checks for header "Auth" |
| `accessToken`      | `string` | **Required**. AccessToken comes from the logged in user |
| `name`      | `string` | **Required**. The name of the hive to be added |

#### Update a hive name

```http
  PUT /gifts/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Auth`      | `Header` | **Required**. Authorization Middleware checks for header "Auth" |
| `accessToken`      | `string` | **Required**. AccessToken comes from the logged in user |
| `name`      | `string` | **Required**. The new name of the hive |

#### Delete an individual gift

```http
  DELETE /gifts/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Auth`      | `Header` | **Required**. Authorization Middleware checks for header "Auth" |
| `accessToken`      | `string` | **Required**. AccessToken comes from the logged in user |

#### Delete an individual hive

```http
  DELETE /hive/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Auth`      | `Header` | **Required**. Authorization Middleware checks for header "Auth" |
| `accessToken`      | `string` | **Required**. AccessToken comes from the logged in user |

### /search-routes

#### Get individual hive

```http
  GET /search
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Auth`      | `Header` | **Required**. Authorization Middleware checks for header "Auth" |
| `accessToken`      | `string` | **Required**. AccessToken comes from the logged in user |
| `searchTerm`      | `string` | **Required**. The queryparam that is positioned right behind /search ("/search/searchTerm=") |
| `searchValue`      | `string` | **Required**. The queryparam that is positioned right behind /searchTerm, the actual value searched for ("/search/searchTerm=HiveName") |

## Techstack used
- React
- Zustand
- Express JS
- Mongoose
- MongoDB
- CSS
- SwalAlert2
- React Burger Menu
- React Router Dom
- Material UI
- Lottie Animation

## View it live
Backend only: [![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)](https://gifthivebackend.onrender.com)

With frontend: [![Netlify Status](https://api.netlify.com/api/v1/badges/a058da08-22d3-4898-8913-fba7338c9a1c/deploy-status)](https://gifthive.netlify.app/)


## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-1DA1F2?style=for-the-badge&logo=ko-fi&logoColor=white)](https://portfolio-laura-lyckholm.netlify.app/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lauralyckholm/)

[![gitgub](https://img.shields.io/badge/github-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LauraLyckholm)