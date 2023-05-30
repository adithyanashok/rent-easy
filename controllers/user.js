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