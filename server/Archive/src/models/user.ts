import mongoose from "mongoose";

const urlRegex = /^https?:\/\/(www\.)?[\w-]+(\.[\w-]+)+([/?#][^\s]*)?$/;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    about: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    avatar: {
        type: String,
        required: true,
        validate: {
            validator: (v: string) =>
                urlRegex.test(v),
                message: (props: { value: string }) => 
                    `${props.value} is not a valid URL!`,
        },
    },
});

const User = mongoose.model("User", userSchema);

export default User;