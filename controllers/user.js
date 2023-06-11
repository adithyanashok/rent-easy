import User from '../models/User.js'

export const getUser = async (req, res) => {
    const id = req.params.id;
  
    try {
      const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  export const UpdateUser = async (req, res, next) => {
    try {
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            // Yes, it's a valid ObjectId, proceed with `findById` call.
            const user = await User.findById(req.params.id)

            if (!user) return next(createError(404, "User Not found"))

            if (req.user.id === user.userId) {

                const updateduser = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true })
                res.status(200).json(updatedPost)
            } else {
                return next(createError(404, "This is not your user to update"))
            }
        }
    } catch (error) {
        console.log(error)

    }
}