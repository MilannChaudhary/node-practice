// const express = require("express");
import express, { response } from "express";
import path, { parse } from "path";
import { home } from "./src/home.js";
import { login } from "./src/login.js";
import { register } from "./src/register.js";
import fs from "fs";

const app = express();
const Port = 3002;
const __dirname = path.resolve();
const taskData = "./data/tasks.json";
console.log(home);

// app.use("/static", express.static(path.join(__dirname, "public")));
// app.use("/random", express.static(path.join(__dirname, "public1")));
// app.use("/src", express.static(path.join(__dirname, "src")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
  const testJson = {
    email,
    password,
  };
  let htmlString = login();
  let { email, password } = req.body;

  if (email == "test@gmail.com" && password == "1234") {
    response.send(testJson);
    // res.send(home("Mr. Test"));
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

const basePath = "/api/v1";

app.get(basePath + "/user", (req, res) => {
  try {
    res.status(200).send("error in server");
  } catch (error) {
    res.status(500).send("error in server");
  }
});

app.post(basePath + "/user", (req, res) => {
  const { email, password } = req.body;
  try {
    res.status(200).send(`${email}=====${password}`);
  } catch (error) {
    res.status(500).send("error in server");
  }
});

//ntdl api

app.get("/ntdl/tasks", (req, res) => {
  fs.readFile("./data/tasks.json", (error, data) => {
    if (error) {
      const errorObj = {
        status: "error",
        message: "Error retreiving tasks",
        data: error.message,
      };
      res.status(500).send(errorObj);
    } else {
      const succcesObj = {
        status: "success",
        message: "Task List Retrieved",
        data: JSON.parse(data),
      };
      res.status(200).send(succcesObj);
    }
  });
});

app.get("/ntdl/tasks/:id", (req, res) => {});

app.post("/ntdl/tasks", (req, res) => {
  console.log(res.body);
  try {
    const { task, hour, type } = req.body;
    const data = fs.readFileSync(taskData, "utf8");
    console.log(100, data);
    const taskList = JSON.parse(data);
    const newTaskObj = {
      id: "randomGen",
      task,
      hour,
      type,
    };
    taskList.push(newTaskObj);

    fs.writeFileSync(taskData, JSON.stringify(taskList));

    const successObj = {
      status: "success",
      message: "Task Created Successfully!",
      data: newTaskObj,
    };

    res.send(200, successObj);
  } catch (error) {
    const errorObj = {
      status: "error",
      message: "Error creating the task",
    };

    res.send(500, errorObj);
  }

  // fs.readFile(taskData, "utf8", (error, data) => {
  //     const taskList = JSON.parse(data);

  //     taskList.push({
  //         id: "randomGen",
  //         task,
  //         hour,
  //         type
  //     })
  // });
});

app.delete("/ntdl/tasks/:id", (req, res) => {
  try {
    const id = req.params.id;
    const data = fs.readFileSync(taskData);
    const taskList = JSON.parse(data);
    const filterTaskList = taskList.filter((task) => (task.id |= id));
    const output = fs.writeFileSync(taskData, JSON.stringify(filterTaskList));
    const successobj = {
      status: "success",
      message: "Task " + id + " deleted!",
    };
    res.status(200).send(successobj);
  } catch (error) {
    const errorobj = {
      status: "error",
      message: "Error deleting task",
    };

    res.status(500).send(errorobj);
  }
});
// app.delete("/ntdl/tasks/:id", (req, res) => {
//   try {
//     const id = req.params.id;
//     const data = fs.readFileSync(taskData);
//     const taskList = JSON.parse(data);
//     const filterTaskList = taskList.filter((task) => (task.id |= id));
//     const output = fs.writeFileSync(taskData, JSON.stringify(filterTaskList));
//     const successobj = {
//       status: "success",
//       message: "Task " + id + " deleted!",
//     };
//     res.status(200).send(successobj);
//   } catch (error) {
//     const errorobj = {
//       status: "error",
//       message: "Error deleting task",
//     };

//     res.status(500).send(errorobj);
//   }
// });

app.listen(Port, (error) => {
  error ? console.log("Error is servving") : console.log("http://localhost:" + Port + " started");
});
