const userRoute = require("express").Router();
const data = require("../db");
const fs = require("fs");

userRoute.get("/", (req, res) => {
  const username = req.query.username || "";
  const password = req.query.password || "";
  const role = req.query.role || "";
  console.log(username, password, role);

  if (username && password && role) {
    const result = data.users.find(
      (item) =>
        item.username === username &&
        item.password === password &&
        item.role === role
    );
    if (!result) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.json({ data: result });
  } else if (username && password) {
    const result = data.users.find(
      (item) => item.username === username && item.password === password
    );
    if (!result) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.json({ data: result });
  }

  return res.json({ data: data.users });
});

userRoute.get("/test", (req, res) => {
  res.json({ msg: "student/test successfully" });
});

userRoute.post("/", (req, res) => {
  responseBody = req.body;
  const exists = checkUserExist(responseBody.username);
  // console.log(exists);
  if (exists) {
    return res.status(500).json({ msg: "user already exists" });
  }
  // fs.writeFileSync("db.json", JSON.stringify(responseBody), (err) => {
  //   if (err) throw err;
  //   console.log("done writing");
  // });

  data.users.push(responseBody);
  // console.log(data.students);
  res.json({
    msg: "user record saved successfully",
    data: data.users[data.users.length - 1],
  });
});

function checkUserExist(username) {
  const status = data.users.findIndex((item) => item.username == username) !== -1;
  console.log(status);
  return status;
}

module.exports = userRoute;
