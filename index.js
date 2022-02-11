const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config()
const ejs = require("ejs");


const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}))


mongoose.connect(process.env.DBNAME, {useNewUrlParser: true})


const studentSchema = new mongoose.Schema({
    firstName: {
        type: String
    }, 
    lastName: {
        type: String
    },
    dd: {
        type: String
    },
    mm: {
        type: String
    },
    yy: {
        type: String
    },
    tenthpercentage: {
        type: Number
    },
    tenthmedium: {
        type: String
    },
    passoutyear: {
        type: Number
    },
    contactnumber: {
        type: Number
    },
    email: {
        type: String
    }
    // ,
    // image: {
    //     data: Buffer,
    //     contentType: String 
    // }
})

const Student = new mongoose.model("Student", studentSchema);


const PORT = process.env.PORT;


app.get("/", (req, res) => {
    res.render("form")
})


app.post("/submitted", (req, res) => {

    const newStudent = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dd: req.body.dd,
        mm: req.body.mm,
        yy: req.body.yy,
        tenthpercentage: req.body.tenthpercentage,
        tenthmedium: req.body.tenthmedium,
        passoutyear: req.body.passoutyear,
        contactnumber: req.body.contactnumber,
        email: req.body.email
    })

    const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dd: req.body.dd,
        mm: req.body.mm,
        yy: req.body.yy,
        tenthpercentage: req.body.tenthpercentage,
        tenthmedium: req.body.tenthmedium,
        passoutyear: req.body.passoutyear,
        contactnumber: req.body.contactnumber,
        email: req.body.email
    }

    newStudent.save((err) => {
        if(err){
            console.log(err);
        } else{
            res.render("submitted", {students: student})
        }
    }) 

})


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})
