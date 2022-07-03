const Messages = require('../model/Messages');

class MessagesController {
    async addMessages(req, res, next) {
        try {
            const { from, to, message } = req.body;
            const data = new Messages(
                {
                    message: { text: message },
                    users: [from, to],
                    sender: from
                }
            );

            data.save();

            return res.json({
                msg: 'send successfully!',
            })

        } catch (error) {
            next(error);
        }
    }

    async getAllMessages(req, res, next) {
        try {
            const { from, to } = req.body;
            console.log(req.body);
            const messages = await Messages.find({
                users: {
                    $all: [from, to]
                }
            }).sort({ createdAt: 1 });
            // console.log(messages);
            const projectMessages = messages.map(msg => {
                return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text
                }
            })

            return res.json(projectMessages);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MessagesController();