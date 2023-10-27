import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const passEncripted = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username,
      email,
      password: passEncripted,
    });

    const result = await newUser.save();
    console.log(result.username);

    jwt.sign({ newUser }, "secretKey", (err, token) => {
      if (err) {
        return console.log("error token", err);
      }
      res.cookie("token", token);
      res.json({
        id: result.id,
        username: result.username,
        email: result.email,
      });
    });
  } catch (error) {
    res.status(500).json({ error: error });
    console.log("papanoel", error);
  }

  //res.send("usuaro registrado ");

  //console.log("newUser", newUser);
  //console.log(username, email, password);
};

const login = async (req, res) => {
  try {
    // traemos el email y el pass desde el body
    const { email, password } = req.body;
    console.log(email, password);

    // preguntamos si el email que tipiamos existe en la base de datos
    //findOne busca el email ingresado en la db , si no lo encuentra devuelve null
    //si lo encuentra devuelve todo el usuario
    const userFound = await UserModel.findOne({ email });
    console.log("UF", userFound);
    //console.log(userFound.password);

    //si no encuentra el usuario en la db , osea devuelve un null
    // me muestre not found
    if (!userFound) {
      return res.status(400).json({ msj: "user not found" });
    }
    //si lo encuentra al email en la db que me compare las contraseñas
    // bcrypt tira un true o un false

    const passComparer = await bcrypt.compare(password, userFound.password);

    // si bcrypt tira un false
    if (!passComparer) {
      return res.status(400).json({ msj: "password incorrect" });
    }

    // si bcrypt tira un true creamos un token de login , osea del usuario encontrado
    jwt.sign({ userFound }, "secretKey", (err, token) => {
      if (err) {
        return console.log("error token", err);
      }
      res.cookie("token", token);
      res.json({ userFound });
      console.log(userFound);
      console.log(token);
    });

    //console.log("tooooken", token);
    //console.log("pass Comparer", passComparer);
    //console.log("pass user db", userFound.password);
    //console.log(password);

    //res.json({ email, password });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const logout = (req, res) => {
  res.cookie("token", "");
  return res.sendStatus(200);
};

export { login, register, logout };
