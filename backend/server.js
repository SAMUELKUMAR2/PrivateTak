const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

const connection = async ()=>{
  try {
   const dbConnection = await mongoose.connect(`mongodb+srv://samuel:samuel123@cluster0.1ophkvp.mongodb.net/myDatabase`)
    console.log("Connected..............................")
 
  } catch (error) {
    console.log("Error",error);
    throw error;
  }
}

connection()



// Define a schema and model
const messageSchema = new mongoose.Schema({
  content: String,
});

const Message = mongoose.model('Message', messageSchema);

// Define routes
app.get('/',(req,res)=>{
  res.send("Server working good....")
})
app.post('/add', (req, res) => {
  const newMessage = new Message(req.body);

  if (req.body=='') {
    return res.status(400).send('message');
}
  newMessage.save()
    .then(() => res.json('Message added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// View Route
app.get('/add',(req,res)=>{
   Message.find()
   .then((data)=>{res.json(data)
    
   }
  )
  
   .catch(err=> res.json(err));
  
 
})
//Delete Route

app.delete('/add',(req,res)=>{
  Message.find().deleteMany()
  .then((data)=>{
    res.json(data)
  })
  .catch(
    err=> res.json(err)
  )
})


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
