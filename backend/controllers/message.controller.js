import cloudinary from "../libs/cloudinary.js";
import User from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filterUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
        res.status(200).json(filterUsers);



    } catch (error) {
        console.error(error);
    }
};

export const getMessages = async (req, res) => {
    try {
        const {id:userToChatId} = req.params
        const myId = req.user._id;


        const messages = await MessageChannel.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.error(error);
    }
};

export const sendMessage = async (req,res) => {
    try {
        const {text, image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

            const newMessage = new message({
                senderId,
                receiverId,
                text,
                image: imageUrl
            });
            await newMessage.save();


            //socket io


            res.status(201).json(newMessage);
        
    } catch (error) {
        console.error(error.message);
        
    }
};