const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  //On client side also delete the accesstoken after deleting them in server
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content(success)
  const refreshToken = cookies.jwt;
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.sendStatus(204); //No content(success)
  }
  //If we reached here it means refresh token found in db so have to delete them.

  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );
  res.clearCookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.sendStatus(204);
};

module.exports = { handleLogout };
