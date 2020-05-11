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

//Any user can access this, get the user token add it to the authorization header

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

//Any user can access this, get the user token add it to the authorization header

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

//Any user can access this, get the user token add it to the authorization header

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

//Any user can access this, get the user token add it to the authorization header

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

//Any user can access this, get the user token add it to the authorization header

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
router.get('/tutors/:tutId', authenticateAdmin, viewTutor)
router.get('/tutors', authenticateAdmin, getAllTutors)

//Category Endpoint
router.post('/category', authenticateAdmin, createCategories)
router.put('/category/:catId', authenticateAdmin, updateCategory)
router.delete('/category/:catId', authenticateAdmin, deleteCategory)
router.post('/category/:catId/subjects', createSubjects)

router.put('/category/:catId/subjects/:subId', authenticateAdmin, updateSubject)
router.delete(
'/category/:catId/subjects/:subId',
authenticateAdmin,
deleteSubject
)

//Lesson Endpoint
router.get('/lessons', authenticateAdmin, viewLessons)
router.get('/lessons/:lessonId', authenticateAdmin, viewLesson)
router.put('/lessons/:lessonId', authenticateAdmin, updateLesson)
router.delete('/lessons/:lessionId', authenticateAdmin, deleteLesson)
router.post('/lessons', authenticateStudentAndAdmin, bookLesson)
