const mongoose = require("mongoose")

const ExcelFileSchema = new mongoose.Schema({
    filename : {type: String, required: true }
})

module.exports = mongoose.model("Excelfile", ExcelFileSchema)