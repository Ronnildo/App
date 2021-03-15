import User from "../models/User";
import jwt from "jsonwebtoken";

import authConfig from "../../config/auth";

class SessionController {
  async store(req, res) {
    const { email, password_hash } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ error: "Usuario não existe" });
    }
    console.log(email);

    const pass = await User.findOne({ where: { password_hash } });

    if (!pass) {
      return res.status(401).json({ error: "Password errado" });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.dataLimite,
      }),
    });
  }
}

export default new SessionController();
