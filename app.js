const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const compression = require('compression');

const connectionToDb = require('./dbConfig/connection.js');

app.use(compression());
app.use(cors());
app.use(express.json({extended:true}));

app.use('/api/v1/auth',require('./routes/authRoute.js'));
app.use('/api/v1/link',require('./routes/linksRoute.js'));
app.use('/',require('./routes/redirectRoute.js'));
app.get('/',(req,res)=>{
	res.status(200).json({message:"hello it\'s test an it works"});
})

connectionToDb()
	.finally(()=>{console.log('mongoose connected')});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{ console.log('server run on port', PORT)})
