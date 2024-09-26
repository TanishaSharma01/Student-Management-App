const express = require("express");
const studentRoute = require("./routes/students");
const userRoute = require("./routes/users");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.get("/", (req, res) => {
  res.send("Successful response.");
});

app.use("/students", studentRoute);
app.use("/users", userRoute);

app.listen(3000, () => console.log("server app is listening on port 3000."));
