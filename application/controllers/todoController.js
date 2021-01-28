const db = require('../../models')
const { Member, Todo } = db

const todoController = {
  listPage: (req, res) => {
    res.render('to-do-list', {
      member: req.user
    })
  },

  getAll: async (req, res) => {
    const todos = await Todo.findAll({
      order: [["to_do_id", "DESC"]],
    })

    res.status(200).json({
      message: "ok",
      result: todos
    })
  },

  todoDetailPage: async (req, res) => {
    const { to_do_id } = req.params
    const members = await Member.findAll()
    const todo = await Todo.findOne({ where: { to_do_id } })

    if (todo === null) {
      console.log("find one todo error: todo not exist");
      return res.status(200).json({
        message: "todo not exist"
      })
    }
    res.render("to-do-detail", {
      member: req.user,
      members: members.map(member => member.account),
      todo
    })
  },

  createPage: async (req, res) => {
    const todos = await Todo.findAll()
    const members = await Member.findAll()
    const memberList = members.map(member => {
      return member.account
    })

    const newTodoId = todos.length === 0 ? 10001 : todos[todos.length - 1].to_do_id + 1;

    res.render('to-do-detail', {
      member: req.user,
      members: memberList,
      todo: {
        to_do_id: newTodoId
      }
    })
  },

  handleUpdate: (req, res) => {
    const {
      to_do_id,
      subject,
      brief,
      level,
      content,
      reserved_time,
      modified_time,
      author
    } = req.body
    const { mode } = req.query

    if (
      !to_do_id ||
      !subject ||
      !brief ||
      !level ||
      !content ||
      !reserved_time ||
      !modified_time ||
      !author
    ) {
      console.log("create todo error: data incomplete");
      return res.status(400).json({
        message: "data incomplete"
      })
    }

    if (mode === "create") {
      Todo.create({
        to_do_id,
        subject,
        brief,
        level,
        content,
        reserved_time,
        modified_time,
        author
      }).then(() => {
        res.status(200).json({
          message: "ok."
        })
      }).catch(err => {
        console.log(`create todo error: ${err.toString()}`);
        res.status(500).json({
          message: err.toString()
        })
      })
    }

    if (mode === "edit") {
      Todo.update(
        {
          to_do_id,
          subject,
          brief,
          level,
          content,
          reserved_time,
          modified_time,
          author,
          updateAt: new Date()
        },
        {
          where: { to_do_id }
        }).then(() => {
          res.status(200).json({
            message: "ok."
          })
        }).catch(err => {
          console.log(`${mode} todo error: ${err.toString()}`);
          res.status(500).json({
            message: err.toString()
          })
        })
    }
  }

}

module.exports = todoController