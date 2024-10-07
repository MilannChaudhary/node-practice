//

// const { function1, function2 } = require("./user");

// import { function1, function2 } from "./esuser.js";

// function1();
// function2();

// const express = require("express");
import express from "express";
import path from "path";
import fs from "fs";

import { home, login, register } from "./src/home.js";

const app = express();
const PORT = 3000;
const __dirname = path.resolve();

app.use("/public", express.static(path.join(__dirname, "static")));

app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  let htmlString = "<h1>HOME PAGE</h1>";
  // response.send(htmlString);

  response.sendFile(path.join(__dirname, "/src/file.json"));
});

app.get("/home", (request, response) => {
  let htmlString = home();
  response.send(htmlString);
});

app.get("/register", (request, response) => {
  let htmlString = register();
  response.send(htmlString);
});

app.post("/register", (request, response) => {
  let { email, name, password } = request.body;
  console.log(email, name, password);
  // saving data to database
  const userObj = {
    ...request.body,
  };

  fs.writeFile("./data/data.json", JSON.stringify(userObj), (error) => {
    if (error) {
      response.send("ERROR WRITING FILE");
    } else {
      response.send(home(name));
    }
  });
});

app.get("/login", (request, response) => {
  let htmlString = login();

  console.log("LOGIN QUERY:", request.query);
  response.send(htmlString);
});

app.post("/login", (request, response) => {
  let { email, password } = request.body;

  fs.readFile("./data/data.json", (error, data) => {
    if (error) {
      response.send("ERROR READING");
    } else {
      const dataJson = JSON.parse(data);
      if (email == dataJson.email && password == dataJson.password) {
        response.send(home(dataJson.name));
      } else {
        response.send(login());
      }
    }
  });
});

// app.get("/order", (request, response) => {
//   console.log("Order PATH");
//   console.log(request.query.orderid);

//   let orderData = {
//     name: "order1",
//     address: "Townhall",
//   };

//   response.send(`${orderData.name}`);
// });

app.get("/addNumber", (request, response) => {
  try {
    let number1 = parseInt(request.query.number1);
    let number2 = parseInt(request.query.number2);
    response.send(`${number1 + number2}`);
  } catch (err) {
    console.log(err.message);
    response.send(err.message);
  }
});

// app.get("/user/getOrderList", (request, response) => {
//   // get list of orders from DatabaseSync
//   // return the list
// });

app.listen(PORT, (error) => {
  error ? console.log("ERROR in serving") : console.log("http://localhost:" + PORT + " started");
});
