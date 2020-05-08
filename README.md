# online-tutoring-app-server
start ng stage 4 task
this task carry weight sha
i'm still working on the task, having troubles with deploying it to heroku
my endpoints are working on postman

Heroku Link
https://online-tutoring-app-server.herokuapp.com/


//student login and register endpoint
//router.post('/register/student', registerStudent)
router.post('/login/student', loginStudent)

//tutor login and register endpoint
router.post('/register/tutor', registerTutor)
router.post('/login/tutor', loginTutor)

//All User route
router.get('/category/:catId', authenticateAllUser, viewEachCategory)
router.get('/category', authenticateAllUser, viewCategory)
router.get('/subjects', authenticateAllUser, viewAllSubjects)
router.get('/category/:catId/subjects/', authenticateAllUser, viewSubjects)
router.get('/category/:catId/subjects/:catId', authenticateAllUser, viewSubject)

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
