import mongoose from "mongoose";

const urlRegex = /^https?:\/\/(www\.)?[\w-]+(\.[\w-]+)+([/?#][^\s]*)?$/;

const cardSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: { 
    type: String, 
    required: true,
    validate: {
            validator: (v: string) =>
                urlRegex.test(v),
                message: (props: { value: string }) => 
                    `${props.value} is not a valid URL!`,
        },
    },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true
    },
  likes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" }
    ],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

const Card = mongoose.model("Card", cardSchema);

export default Card;
