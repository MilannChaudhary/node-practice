// const express = require("express");
import express from "express";
import path from "path";
import { home } from "./src/home.js";
import { login } from "./src/login.js";
import { register } from "./src/register.js";

const app = express();
const Port = 3002;
const __dirname = path.resolve();
console.log(home);

app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/random", express.static(path.join(__dirname, "public1")));
// app.use("/src", express.static(path.join(__dirname, "src")));

app.use(express.urlencoded({ extended: true }));

// app.get("/milan", function (req, res) {
//   console.log("USER PATH");
//   console.log(req);
//   let nameData = {
//     name: "Gehendra",
//     address: "Campsie",
//   };
//   res.send(nameData);
// });
// app.get("/control", function (req, res) {
//   console.log("USER PATH");
//   console.log(req);
//   let controlData = {
//     name: "Nabin",
//     address: "Mahendranagar",
//   };
//   res.send(controlData);
// });

// app.get("/addNumber", (req, res) => {

//     try{let num1 = req.query.number1;
//         let num2 = req.query.number2;
//         let sum = parseFloat(num1) + parseFloat(num2);

//         res.send(`${sum}`);}
//         catch(err){
//             console.log("there is error");
//         }

// });

app.get("/home", function (req, res) {
  let htmlString = home();
  res.send(htmlString);
});
app.get("/login", function (req, res) {
  let htmlString = login();
  console.log("LOGIN QUERY:", req.query);
  res.send(htmlString);
});
app.post("/login", function (req, res) {
  let htmlString = login();
  let { email, password } = req.body;

  if (email == "test@gmail.com" && password == "1234") {
    res.send(home("Mr. Test"));
  } else {
    res.send(login());
  }
  console.log("LOGIN QUERY:", email, password);
  res.send(htmlString);
});
app.get("/register", function (req, res) {
  let htmlString = register();

  res.send(htmlString);
});
app.post("/register", function (req, res) {
  let htmlString = register();
  let { name, email, password } = req.body;
  if (name && email && password) {
    res.send(home("Mr. Milan"));
  } else {
    res.send(register());
  }
  res.send(htmlString);
});

app.listen(Port, (error) => {
  error ? console.log("Error is servving") : console.log("http://localhost:" + Port + " started");
});
