const db = require("../../models");
const FileModel = db.file;
const fs = require('fs')
const path = require('path')

exports.getCollection = async (req, res) => {
    const rs = await getCollection('file', req.body)
    res.json(rs)
}

exports.upload = async(req, res) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }

    await FileModel.create({
      filename: file.filename
    })

    res.json({
        fileName: file.filename,
        uploaded: 1,
        url: 'https://winelux.vn/upload/' + file.filename
    })
}

exports.delete = async (req, res) => {
    try {
        let file = await FileModel.findOne({ _id: req.params.id })
        if (file) {
            try {
                let filePath = path.join(APP_DIR, 'public', file.filename)
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath)
                }

                await file.remove()
                return res.status(200).json({ code: 'success', msg: 'Xóa thành công' });
            } catch (error) {
                return res.status(500).json({ code: 'error', msg: error.message });
            }
        }
       
        
        res.status(400).json({ code: 'error', msg: 'Không tìm thấy' });
    } catch (error) {
        res.status(500).json({ code: 'error', msg: error.message });
    }
};
