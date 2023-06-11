import Chat from "../models/Chat.js";

export const CreateChat = async (req, res, next) => {
  try {
    const chat = await Chat.findOne({
      members: { $in: [req.body.senderId] },
    });
    if (!chat) {
      var newChat = await Chat({
        members: [req.body.senderId, req.body.receiverId],
      });

      var savedChat = await newChat.save();
    }
    res.status(200).json(savedChat);
  } catch (error) {
    console.log(error);
  }
};

export const userChats = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const chat = await Chat.find({
      members: { $in: [req.params.id] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res, next) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
  }
};
