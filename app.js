const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const Courses=[{name:'control system',code:'CSE321',id:1,desc:''}
,{name:'multimedia',code:'CSE322',id:2,desc:''},
{name:'image processing',code:'CSE323',id:3,desc:''}];


app.get('/api/courses'  , (req , res) => {
	res.send(Courses);
});

app.get('/api/courses/:id'  , (req , res) => {
	const Course=Courses.find(c => c.id === parseInt(req.params.id)) ;
	if (!Course) return  res.status(404).send(" The Course with the given ID is not found") ;
	res.send(Course) ;
}); 

app.post('/api/courses/create'   , (req , res) => {
    const joiCourses = Joi.object({
        name:Joi.string().min(5).required(),
        code:Joi.string().length(6).required(),
        desc:Joi.string().min(0).max(200)
    })
    const rst= joiCourses.validate(req.body);
     if (rst.error) return  res.status(400).send(error.details[0].message) ;
	   const Course={
           id : Courses.length+1,
           name : req.body.name,
           code : req.body.code,   
           desc : req.body.desc
	    };
	    Courses.push(Course) ;
	    res.send(Course) ;   
});

app.put('/api/courses/:id'   , (req , res) => {
    const course=Courses.find(c => c.id === parseInt(req.params.id)) ;
	if (!course) return res.status(404).send(" The Course with the given ID is not found") ;
    const joiCourses = Joi.object({
        name:Joi.string().min(5).required(),
        code:Joi.string().length(6).required(),
        desc:Joi.string().min(0).max(200)
    })
    const rst= joiCourses.validate(req.body);
       if (rst.error) return res.status(400).send(error.details[0].message) ;
       course.name = req.body.name ;
       course.code = req.body.code ;
        res.send(course) ;
    });

app.delete('/api/courses/:id'   , (req , res) => {
  const course=Courses.find(c => c.id === parseInt(req.params.id)) ;
  if (!course)  return res.status(404).send(" The Course with the given ID was not found") ; 
   const index = Courses.indexOf(course) ;
   Courses.splice(index , 1) ;
   res.send(course) ;

});

const students=[{id:1,name:'Ghada Ragab',code:'1600953'},
                {id:2,name:'Dina Ahmed',code:'1600950'}];

app.get('/api/students'  , (req , res) => {
	res.send(students);
});

app.get('/api/students/:id'  , (req , res) => {
	const student=students.find(c => c.id === parseInt(req.params.id)) ;
	if (!student) return  res.status(404).send(" The student with the given ID is not found") ;
	res.send(student) ;
}); 

app.post('/api/students/create'   , (req , res) => {
    const joiStudent = Joi.object({

        name: Joi.string().pattern(new RegExp('^([a-zA-Z]*\'*-*)*$')).required(),
        code: Joi.string().length(7)
    })
    const rst= joiStudent.validate(req.body);
       if (rst.error) return  res.status(400).send(error.details[0].message) ;
	   const student={
		id: students.length+1  ,
		name: req.body.name ,
		code: req.body.code 
	    };
	    students.push(student) ;
	    res.send(student) ;   
});

app.put('/api/students/:id'   , (req , res) => {
    const student=students.find(c => c.id === parseInt(req.params.id)) ;
	if (!student) return res.status(404).send(" The Student with the given ID is not found") ;
    const joiStudent = Joi.object({
        name: Joi.string().pattern(new RegExp('^([a-zA-Z]*\'*-*)*$')).required(),
        code: Joi.string().length(7)
    })
    const rst= joiStudent.validate(req.body);
       if (rst.error) return res.status(400).send(error.details[0].message) ;
        student.name = req.body.name ;
        student.code = req.body.code ;
        res.send(student) ;
    });

app.delete('/api/students/:id'   , (req , res) => {

  const student=students.find(c => c.id === parseInt(req.params.id)) ;
  if (!student)  return res.status(404).send(" The Student with the given ID is not found") ; 
   
   const index = students.indexOf(student) ;
   students.splice(index , 1) ;
   res.send(student) ;

});
app.get('/web/courses/create',(req,res) =>{
    res.sendFile(__dirname+"/app.html")
})

// app.get('/web/students/create',(req,res) =>{
//     res.sendFile(__dirname+"/lms_Student.html")
// })

app.get('/',(req,res) =>{
    res.send('Welcome');
})

const port = process.env.PORT || 3000
app.listen(port,()=> console.log(`listening to prot ${port}...`));

