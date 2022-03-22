// 1 require express
const express = require ('express');
// 2 create instance
const app = express();
// 5 require dotenv
require('dotenv').config()
// 6 connectDB
const connectDB = require('./config/connectDB')
connectDB
// require Pesron
const Person = require("./models/Person")

// Create and Save a Record of a Model
// Person Prototype
//name : string [required]
//age :  number
//favoriteFoods : array of strings (*)

const Person = new Person(
    {
        name: 'dwight',
        age: '40',
        favoriteFoods:["pasta", "steak"]
    }
)
Person.save((err,data)=>{
    if (err){
        console.log(err)
    }else{
        console.log(data)
    }
})
//Create Many Records with model.create()

const arrayOfPeople=[
    {name:'pam', age:32, favoriteFoods:['pizza', 'waffles']},
    {name:'Jim', age:35, favoriteFoods:['hamburger', "chips"]},
    {name:'erin', age: 23, favoriteFoods:['tortilla', 'fish']}
];

Person.create(arrayOfPeople,(err,data)=>{
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})

//Use model.find() to Search Your Database

Person.find({name:'pam'},(err,data)=>{
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})

 //Use model.findOne() to Return a Single Matching Document from Your Database

    Person.findOne(({ favoriteFoods:'steak'}),(err,data)=>{

    if(err){
        console.log(er)
    }else{
        console.log(data)
    }
})

//Use model.findById() to Search Your Database By _id
Person.findById({_id: personId}, (err, data) => {
    if (err) {
        return done(err);
    }
    return done(null, data);
});

//Perform Classic Updates by Running Find, Edit, then Save
let foodToAdd = 'sushi';
Person.findById(personId).then((person) => {
    person.favoriteFoods.push(foodToAdd);
    person.save();
});

//Perform New Updates on a Document Using model.findOneAndUpdate()
let personName = 'andy';
Person.findOneAndUpdate({name: personName},{$set:  {age:22 }},{ new: true },(err,data)=>{
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})

// Delete One Document Using model.findByIdAndRemove
let removeById = function (personId, done) {

    Person.findOneAndRemove(personId, function (err, data) {
        if (err) {
            done(err);
        }
        done(null, data);
    });

};
//Chain Search Query Helpers to Narrow Search Results
let queryChain = function (done) {
    var foodToSearch = 'waffles';

    Person.find({favoriteFoods: foodToSearch}).sort({name: "asc"}).limit(2)
    .select("-age").exec(function (err, data) {
        if (err) {
            done(err);
        }
        done(null, data);
    });
};




// 3 create port
const PORT = process.env.PORT
// 4 create server
app.listen(PORT , (err)=> {
    err? console.log(err):console.log(`Server is running on port ${PORT}...`)
})