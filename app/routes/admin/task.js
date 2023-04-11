const express = require('express');
const app = express();
const $ = require('../../middlewares/safe-call')
const modelName = 'task'
const TaskModel = db[modelName];
// custom routes
app.get("/status-list", $(async (req, res) => {
  const doc = TaskModel.STATUS_LABEL
  return res.json({ success: true, doc })
}))

// CRUD routes
app.post("/collection", $(async (req, res) => {
  const rs = await getCollection(modelName, req.body)
  res.json(rs)
}))

app.get("/", $(async (req, res) => {
  let filter = {}
  if (req.user.role != 'admin') {
    let sprintsOfUser = await db.sprint.find({ users: req.user._id })
    let spIDs = sprintsOfUser.map(sp => sp._id)
    filter.sprint = { $in: spIDs }
  }
  const docs = await TaskModel.find(filter).populate({ path: 'assigned_users', select: 'fullname' }).populate({ path: 'epic', select: 'name' }).catch(error => {
    console.error('Error: ', error);
    return []
  })
  return res.json({ success: true, docs })
}))

app.get("/:id", $(async (req, res) => {
  const id = req.params.id
  if (id) {
    const doc = await TaskModel.findOne({ _id: id }).catch(error => {
      console.error('Error: ', error);
      return null
    })

    if (doc) {
      return res.json({ success: true, doc })
    }
  }

  return res.json({ success: false, doc: null })
}))

app.post("/", $(async (req, res) => {
  const data = req.body

  if (data) {
    if (data._id) {
      // update
      // TODO - validate
      const currentDoc = await TaskModel.findOne({ _id: data._id })
      const updatedDoc = await TaskModel.updateOne({ _id: data._id }, data).catch(error => {
        console.error('Error:', error);
        return null
      })

      if (updatedDoc) {
        if (data.sprint) {
          await db.sprint.updateOne({ _id: currentDoc.sprint }, { $pull: { tasks: currentDoc._id } })
          await db.sprint.updateOne({ _id: data.sprint }, { $push: { tasks: data._id } })
        }
        return res.json({ success: true, doc: updatedDoc, status: 'success', message: 'Cập nhật thành công.' })
      } else {
        return res.json({ success: false, status: 'error', message: 'Cập nhật thất bại.' })
      }
    } else {
      // create new
      // TODO - validate
      const createdDoc = await TaskModel.create(data).catch(error => {
        console.error('Error:', error);
        return null
      })

      if (createdDoc) {
        if (createdDoc.sprint) {
          await db.sprint.updateOne({ _id: createdDoc.sprint }, { $push: { tasks: createdDoc._id } }).catch(error => {
            console.error('Error:', error);
            return null
          })
        }
       
        return res.json({ success: true, doc: createdDoc, status: 'success', message: 'Tạo mới thành công.' })
      } else {
        return res.json({ success: false, status: 'error', message: 'Tạo mới thất bại.' })
      }
    }
  }
  return res.json({ success: false, status: 'error', message: 'Vui lòng cung cấp dữ liệu.' })
}))

app.delete("/:id", $(async (req, res) => {
  const id = req.params.id
  if (id) {
    const result = await TaskModel.deleteOne({ _id: id }).catch(error => {
      console.error('Error: ', error);
      return null
    })

    if (result && result.deletedCount) {
      return res.json({ success: true, status: 'success', message: 'Xóa hoàn tất.' })
    }
  }

  return res.json({ success: false })
}))

module.exports = app;
