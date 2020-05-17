# online-tutoring-app-server

start ng stage 4 task
this task carry weight sha
i'm still working on the task, having troubles with deploying it to heroku
my endpoints are working on postman

Heroku Link
https://online-tutoring-app-server.herokuapp.com/

//Admin Login
//I created a tutor and set it to have admin access = true

email: "admin@gmail.com"
password: "12345"

//Student register endpoint
URL: /register/student

method: POST

Response
Status code 200
Success
Content

{
status:true,
message: 'message'
}

//Student login endpoint
URL: /login/student

method: POST

Response
Status code 200
Success
Content

{
message:message,
id,
token
}

//Tutor register endpoint
URL: /register/tutor

method: POST

Response
Status code 200
Success
Content

{
status:true,
message: 'message'
}

//Tutor login endpoint
URL: /login/tutor

method: POST

Response
Status code 200
Success
Content

{
message:message,
id,
token
}

//All User Route

//Category endpoint
URL: /category

method: GET

Response
Status code 200
Success
Content

{
subject:[
id
],
id,
title,
createdAt,
updatedAt
}

//Get a particular category
URL: /category:/catId

method: GET


Response
Status code 200
Success
Content

{
subject:[
id
],
id,
title,
createdAt,
updatedAt
}

//Get subjects in a category
URL: /category:/catId/subjects

method: GET


Response
Status code 200
Success
Content

{
"subjects": [
{
id,
title,
category
}
],
id,
title,
createdAt,
updatedAt
}

//Get subjects in a category
URL: /category:/catId/subjects:/subId

method: GET


Response
Status code 200
Success
Content

{
"subjects": [
{
id,
title,
category
}
],
id,
title,
createdAt,
updatedAt
}

//subject route
URL: /subjects

method: GET

Response
Status code 200
Success
Content

{
subjects:[
{
id,
title,
catId
}
],
id,
title,
createdAt,
updatedAt
}

//admin route

//Get a particular tutor
URL: /tutors/:tutId

method: GET

//Requires the admin token, add it to the authorization header

Response
Status code 200
Success
Content

{tutor}

//Get tutors
URL: /tutors

method: GET

//Requires the admin token, add it to the authorization header

Response
Status code 200
Success
Content
[
{tutor},
{tutor}
]

//Deactivate tutor
URL: /tutors/:tutId

method: DELETE

//Requires the admin token, add it to the authorization header

Response
Status code 200
Success
Content

{message: 'message'}

//Get Categories
URL: /category
method: GET

//Requires the admin token, add it to the authorization header

Required fields: field required
{
title: ""
}

Response
Status code 200
Success
Content

[
{
"subjects": [
id: ""
],
"\_id": "",
"title": "",
},
{
"subjects": [],
"\_id": "",
"title": ""
},
{
"subjects": [],
"\_id": "",
"title": ""
},
{
"subjects": [],
"\_id": "",
"title": ""
}
]

//Update Categories
URL: /category/:catId
method: PUT

//Requires the admin token, add it to the authorization header

Required fields: field required
{
title: ""
}

Response
Status code 200
Success
Content

{
status: 'success',
message: 'updated successfully'
}

//Delete Category
URL: /category/:catId
method: DELETE

//Requires the admin token, add it to the authorization header

Response
Status code 200
Success
Content

{
status: 'success',
message: 'category deleted'
}

//Add Subjects to category
URL: /category/:catId/subjects

method: POST

//Requires the admin token, add it to the authorization header

Required fields: field required
{
title: "",
catId:""
}

//UPDATE SUBJECT IN A CATEGORY
URL: /category/:catId/subjects

method: PUT

//Requires the admin token, add it to the authorization header

Required fields: field required
{
title: ""
}

//DELETE SUBJECT IN A CATEGORY
URL: /category/:catId/subjects/:subId

method: DELETE

//Requires the admin token, add it to the authorization header

//LESSON ENDPOINT

URL: /lessons

method: POST
////Requires the admin or student token, add it to the authorization header

Required fields: field required
{
tutor_id:"",
student_id:"",
subject_id
}
