require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

const cors = require('cors')
const path = require('path')

const todoController = require('./application/controllers/todoController')
const userController = require('./application/controllers/userController')

const auth = require('./middlewares')

const app = express();
const routerToDoList = express.Router()
const routerToDoListDetail = express.Router()

app.set('views', './application/views');
app.set('view engine', 'ejs');

app.use(cors())
app.use(express.static('application'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", userController.loginPage);
app.post("/auth", userController.handleLogin)
app.get("/index", auth, userController.index)
app.get("/welcome", auth, userController.index)
app.get("/logout", userController.handleLogout)
app.get("/members", auth, userController.getAll)

app.use("/to-do-list", auth, routerToDoList)
routerToDoList.get('/page', todoController.listPage)
routerToDoList.get('/list', todoController.getAll)

routerToDoList.use("/detail", auth, routerToDoListDetail)
routerToDoListDetail.get('/create/page', todoController.createPage)
routerToDoListDetail.get('/:to_do_id', todoController.todoDetailPage)
routerToDoListDetail.put('/:to_do_id', todoController.handleUpdate)

app.use((req, res) => {
  res.status(404).send("404 Not found");
});

app.listen(8088, () => {
  console.log("Server is running at http://localhost:" + String(8088));
});
