const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = usersDB.users.find(
    (person) => person.username === username
  );
  //If username Not Found
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // create JWTs here in future . we will see that soon
    res.json({ success: `User ${username} is logged in!` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
