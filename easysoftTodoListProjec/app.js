const express = require("express");
const mongo = require("mongodb");
const assert = require("assert");

// var url = "mongodb://localhost:27017/employeedb";
var url = "mongodb://localhost:27017/";
// const path = require("path");

const app = express();
app.set("view engine", "ejs");
// const nav = [
//   { link: "/todolist", title: "Todo" },
//   { link: "/employeeList", title: "EmployeeList" },
// ];

// const employee = require("employeeList")(nav);
// const todoRouter = require("todoList")(nav);

app.set(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const employees = [
//   {//     employeeID: "ES108988",
//     name: "Nana",
//     position: "IT manager",
//     todo: "Repair Network fault at the HRs Office",
//   },
//   {
//     employeeID: "ES108344",
//     name: "Yaa",
//     position: "Human Resource manager",
//     todo: "To lay off works and aquire more soap and detargents for works",
//   },
//   {
//     employeeID: "ES109876",
//     name: "kofi",
//     position: "Security manager",
//     todo: "Lights and Shift duties are to be monited.",
//   },
// ];

// var getUser = function (req, res, next) {
//   res.send("Show user with id = " + req.params.id);
// };
// app.get("/createtodolist/:id", getUser);

var getUser = function (req, res, next) {
  var userId = req.params.id;
  var actionToPerform = req.params.action;
  res.send("User (" + userId + "): " + actionToPerform);
};
app.get("/todolist/:id", (req, res) => {
  var userId = req.params.id;
  var resultArray = [];
  // res.render("todoList", { employees });
  mongo.connect(url, function (err, db) {
    assert.equal(null, err);
    var dbo = db.db("employeedb");
    var cursor = dbo.collection("todo").find();
    cursor.forEach(
      function (doc, err) {
        assert.equal(null, err);
        resultArray.push(doc);
      },
      function () {
        db.close();
        res.render("todoList", { items: resultArray, key: userId });
      }
    );
  });
  // res.render("todoList", { key: getUser });
});

app.get("/", (req, res) => {
  var resultArray = [];
  // res.render("employeeList", { employees });
  mongo.connect(url, function (err, db) {
    assert.equal(null, err);
    var dbo = db.db("employeedb");
    var cursor = dbo.collection("todo").find();
    cursor.forEach(
      function (doc, err) {
        assert.equal(null, err);
        resultArray.push(doc);
      },
      function () {
        db.close();
        res.render("employeeList", { items: resultArray });
      }
    );
  });
});

// app.get("/todolist", (req, res) => {
//   var resultArray = [];
//   // var goback = "Please go back to EmployeeList to veiw your todo List";
//   // res.render("todoList", { employees });
//   mongo.connect(url, function (err, db) {
//     assert.equal(null, err);
//     var dbo = db.db("employeedb");
//     var cursor = dbo.collection("todo").find();
//     cursor.forEach(
//       function (doc, err) {
//         assert.equal(null, err);
//         resultArray.push(doc);
//       },
//       function () {
//         resultArray.forEach((employeeID) => {
//           var id = this.employeeID;
//         });
//         db.close();
//         res.render("todoList", {
//           items: resultArray,
//           key: resultArray.employeeID,
//         });
//       }
//     );
//   });
// });

// app.get("/createtodolist", (req, res) => {
//   res.render("createtodolist", { employees });
// });
// app.get("/12345", (req, res) => {
//   res.render("createtodolist", { employees });
// });

const port = 4040;

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
