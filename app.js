const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

// to make this website static
app.use(express.static("public"));

// to make this website use this body-parser module that is imported already
app.use(bodyParser.urlencoded({ extended: true }));

// for get request to the router
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

// to get the data such as first name, last name, email here in server to work on that posted data by user.
app.post("/", (req, res) => {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const EmailId = req.body.emailId;
  const data = {
    members: [
      {
        email_address: EmailId,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/a1be7b5e54";
  const options = {
    method: "POST",
    auth: "lakshay1:w7c2f3ffec87a484181168cbfd84e44dd-us14",
  };
  const response = https.request(url, options, (response) => {
    if(response.statusCode === 200)
    {
        res.sendFile(__dirname + "/success.html");
    }else{
        res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });

  response.write(jsonData);
  response.end();
});
app.post("/failure", (req, res) => {
    res.redirect("/");
})
// api key - 7c2f3ffec87a484181168cbfd84e44dd-us14
// audience id - a1be7b5e54

// for listening the server
app.listen(process.env.PORT || 3000, () => {
  console.log("Listening to port 8000");
});
