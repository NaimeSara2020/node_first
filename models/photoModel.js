import mongoose from "mongoose";  //uygulamaya göre model işlemlerini sağlayan bir ODM modülüdür

const { Schema } = mongoose;

const photoSchema = new Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },
    description : {
        type: String,
        required: true,
        trim: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const Photo = mongoose.model("Photo",photoSchema);

export default Photo;