const userDto = require("../../dto/authDto");
const {
  comparePassword,
  hashedPassword,
} = require("../../helper/comparepassword");
const { generateToken, setCookie } = require("../../helper/jwt");
const wrap = require("../../helper/wrapper");
const {
  createUser,
  findUserById,
  findByEmail,
} = require("../service/user.service");

exports.createANewUser = wrap(async (req, res) => {
  let { email, password } = req.body;
  const foundUser = await findByEmail(email);
  if (foundUser) {
    return res.status(409).json({ message: "User already exists" });
  }
  password = await hashedPassword(password);
  const newUser = await createUser(email, password); // 1
  const createdUser = await findUserById(newUser.insertId);
  return res.status(201).json(createdUser);
});

exports.userLogin = wrap(async (req, res) => {
  const { email, password } = req.body;
  const user = await findByEmail(email);
  if (!user) return res.status(404).json({ message: "User not found" });
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
  const token = await generateToken({ id: user.id, email: user.email });
  setCookie("token", token);
  return res.status(200).json({ token });
});
