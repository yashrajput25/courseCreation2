const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true},
    videos: [{type: String, require:true}],
    playlistUrl : {type : String, default: null}
})

module.exports = mongoose.model("Course", courseSchema);