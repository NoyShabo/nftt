const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const serverless = require('serverless-http');
const axios = require('axios');
const path = require('path');


const app = express();
const port = 4000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsConfig = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
}
app.use(corsConfig);


app.use(express.static(path.join(__dirname,"../react/build") ));

app.use(bodyParser.json());
app.use(cookieParser());


app.get('/', async (req, res) => {

  const data = await axios({
    url: `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=LW5VYVU2OHBKNENGM2tMYk9fMzI6MTpjaQ&redirect_uri=https://localhost:3000&scope=tweet.read%20users.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`, 
    method: 'GET'
  });
  console.log(data.data);
  res.send(data);
  // res.sendFile(path.join(__dirname,"../../react/build/index.html"))
  // res.json({message: data});  
});

app.get("*", (req,res)=>{
  console.log('noyyyyyyyyyyyyy');
})


  app.listen(port, () => {
    console.log('hiii');
    console.log(`Example app listening at http://localhost:${port}`)
  })
// }