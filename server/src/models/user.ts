import mongoose from "mongoose";

const urlRegex = /^https?:\/\/(www\.)?[\w-]+(\.[\w-]+)+([/?#][^\s]*)?$/;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        default: "Jacques Cousteau",
    },
    about: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        default: "Explorador",
    },
    avatar: {
        type: String,
        required: true,
        default: "https://practicum-content.s3.us-west-1.amazonaws.com/web-lat/avatar.jpg",
        validate: {
            validator: (v: string) =>
                urlRegex.test(v),
                message: (props: { value: string }) => 
                    `${props.value} is not a valid URL!`,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
});

const User = mongoose.model("User", userSchema);

export default User;