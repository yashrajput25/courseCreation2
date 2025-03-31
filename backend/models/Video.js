
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    excelFileId : { type: mongoose.Schema.Types.ObjectId, ref: "ExcelFile", required: true },
    youtubeurl : { type: String, required: true },
    timestamps : [{
        title : {type: String, required: true},
        startTime: {type: String, required: true},
        endTime: {type: String, required: true},
    }]
});

module.exports = mongoose.model("Video", videoSchema)