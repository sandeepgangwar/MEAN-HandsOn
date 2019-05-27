const express = require('express');
const app = express();

app.listen(3000,()=>{
console.log('listening on 3000')
});

app.get('/',(req,res)=>{
	return res.send("<h1 style='color:red'>Recived Get Request</h1>");
})

app.get('/index',(req,res)=>{
	return res.sendFile(__dirname+ '/index.html');
})

