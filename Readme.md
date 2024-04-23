This project contains two directories: frontend(react.js) and backend(node.js)

1.) backend: This directory contains majority of its code in src directory
controllers(These are the promises corresponidng to different routes which are called as soon as url hits)
db(It contains the script to connect your project to database(for this project, MongoDB))
middlewares(These contains bridges between routes and promises like authentication)
models(These contains basic layout for different collection for storing data)
routes(These describes the url structure and their corresponding promises form controllers)
utils(These includes some repititive tasks like Error handling, Respoonse Handling and asyncHandler)
app.js(This script establishes express.js to establish connection between server and client)
index.js(This is the first script called as soon as backend is started)

2.) frontend: This directory also contains majority of its code in src directory
styles.css(This layout the basic design of every element of website pages)
app.js(This contains routes of every url and their corresponding files)
index.js(This is the first script called as soon as frontend started)
Dashboard.js,LoginPage.js,SignupPage.js(These layout the pages of website, html and javascript promises for functionality)
AddTaskPopup.js,UpdateAssignee.js(These layout the structure of various popups openend for filling data for some particular buttons)

3.) Setting up Project:
You need to first write .env files corresponding to fronetend and backend both

        frontend:
        BACKEND_SERVER =

        backend:
        PORT =
        DB_URL =
        CORS_ORIGIN =
        ACCESS_TOKEN_SECRET=
        ACCESS_TOKEN_EXPIRY=
        REFRESH_TOKEN_SECRET=
        REFRESH_TOKEN_EXPIRY=

    You need to install dependencies for backend as well as frontend mentioned in their package.json
