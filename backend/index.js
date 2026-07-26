const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');

// Force Node.js to use Google DNS for MongoDB Atlas SRV resolution
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const connection = async () => {
  try {
    await mongoose.connect(`mongodb+srv://samuel:samuel123@cluster0.1ophkvp.mongodb.net/test`);
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

connection();

// Schema
const messageSchema = new mongoose.Schema({
  content: { type: String, default: '' },
  time: String,
  sender: { type: String, default: 'web' },
  isRead: { type: Boolean, default: false }
});

const Message = mongoose.model('Message', messageSchema);

// Routes
app.get('/', (req, res) => {
  res.send("Server working good....");
});

app.post('/add', async (req, res) => {
  try {
    const { content, time, sender } = req.body;
    const newMessage = new Message({
      content: content !== undefined ? content : '',
      time: time || new Date().toISOString(),
      sender: sender || 'web',
      isRead: false
    });
    await newMessage.save();
    res.json('Message added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

app.get('/add', async (req, res) => {
  try {
    const data = await Message.find();
    await Message.updateMany({ isRead: false }, { isRead: true });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/unread-count', async (req, res) => {
  try {
    const count = await Message.countDocuments({ isRead: false, sender: 'web' });
    res.json({ unreadCount: count });
  } catch (err) {
    res.status(500).json({ unreadCount: 0 });
  }
});

app.delete('/add', async (req, res) => {
  try {
    const data = await Message.deleteMany();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});




/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

const connection = async ()=>{
  try {
   const dbConnection = await mongoose.connect(`mongodb+srv://samuel:samuel123@cluster0.1ophkvp.mongodb.net/test`)
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
  time:String,
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
*/
