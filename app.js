//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Cinema is an extremely popular source of entertainment worldwide. Numerous movies are produced each year and people watch these in large numbers. Cinema impacts our life both positively and negatively. Just as everything else in this world, cinema also has positive as well as negative impact on our life. While some movies can change our thinking for good others can invoke a feeling or pain or fear.";
const aboutContent = "It is said that he lived in this street, and that it was the vestibule of the children. It is said that the vestibulum of the rhoncus is a corporal punishment. It is not just a fancy vestibule. The street was said to be clear of arrows. But you need a smile at the price of what vulputate dignissim has suspended. Let's get into some salad. Always smile in the hendrerit gravida rutrum every one not the land of the orci. He likes the massa vitae tortor sauce lacinia quis or eros. For the earth is the element of the arrows of life. Mauris ultrices eros in the course of the university mass tincidunt dui.";
const contactContent = "Scelerisque eleifend until the price vulputate sapien. Roncus urn is neither cartoon nor basketball. Let us live with the bow of God, let us drink the bow of the cat. It will be followed by the education of the family of the sad family. Risus viverra adipiscing at in the whole land of feugiat. It is not wise to drink the bow of life that is expected from arrows. The result is sometimes a lot of real estate. But now the target is the propaganda lake. Sometimes it is very difficult to put the Internet itself on the customer's attention. For the whole element of the pillow is neither. The pregnant woman was told that there was no clinical placement. Mauris is in some sort of environment as a disease. To put a twister and to always cartoon for free.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", function (req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });

});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);
  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if(storedTitle === requestedTitle){
      res.render("post",{
        title: post.title,
        content: post.content
      });
    }
  });

});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
