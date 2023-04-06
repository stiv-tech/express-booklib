const express = require('express');
const Joi = require('joi');
const app = express()

app.use(express.json())

const booksLib = [
    {id: 1, category: "romance", author: "getrude"},
    
    {id: 2, category: "horror", author: "stephen"},
    
    {id: 3, category: "action", author: "smart"},
    
    {id: 1, category: "sci-fi", author: "agness"}
    
    ]

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/api/books', (req, res) => {
    res.send(booksLib);
 });

 app.post('/api/books', (req, res) => {
    const { error } = validateCourse(req.body)

      if (error) return res.status(400).send(error.details[0].message);

    const course = {
     id: booksLib.length + 1, 
     category: req.body.name,
     author: req.body.name,
     
    };
    booksLib.push(course);
    res.send(course)
 });


 app.put('/api/books/:id', (req, res) => {
    const course = booksLib.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(400).send('the course with this ID not found');

    const { error } = validateCourse(req.body)

      if (error) return res.status(400).send(error.details[0].message);

      course.category = req.body.name;
      course.author = req.body.name
      res.send(course)
    })


 app.get('/api/books/:id', (req, res) => {
    const course = booksLib.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(400).send('the Book with this ID not found');
    res.send(course)
 });

 app.delete('/api/books/:id', (req, res) => {
    const course = booksLib.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(400).send('the Book with this ID not found');
  
   // delete
    const index = booksLib.indexOf(course);
    booksLib.splice(index, 1);
  
   // return the same course
     res.send(course);
  })


 function validateCourse(course) {
 
    const schema = {
      name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
    
    }


 const port = process.env.PORT || 3001;

 app.listen(port, () => console.log(`listening on port ${port}...`));