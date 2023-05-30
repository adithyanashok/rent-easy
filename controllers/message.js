import Message from "../models/Message.js"


export const addMessage = async(req, res, next) => {
    const {chatId, senderId, text} = req.body
    const message = await Message({
        chatId,
        senderId,
        text
    })
    try {
        const newMessage = await message.save()
        res.status(200).json(newMessage)
    } catch (error) {
        next(error)
        
    }
}
export const getMessages = async (req, res, next) => {
 const {chatId} = req.params;
 try {
    const message = await Message.find({chatId})
    res.status(200).json(message)
 } catch (error) {
    next(error)
    
 }
}