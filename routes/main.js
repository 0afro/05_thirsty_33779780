// Create a new router
const express = require("express");
const router = express.Router();

//Shop data
var shopData = { shopName: "Caffeine Zombies",
    productCategories:["Beer", "Wine", "Soft Drinks", "Hot Drinks"],

    shops: [
        {
            location: "Camden Town, London",
            manager: "Sophie Taylor",
            address: "12 Camden High Street, London NW1 0JH"
        },
        {
            location: "Shoreditch, London",
            manager: "Omar Rahman",
            address: "88 Brick Lane, Shoreditch, London E1 6QL"
        },
        {
            location: "Greenwich, London",
            manager: "Emily Johnson",
            address: "34 Cutty Sark Street, Greenwich, London SE10 9LS"
        },
        {
            location: "Brixton, London",
            manager: "Marcus Brown",
            address: "205 Coldharbour Lane, Brixton, London SW9 8RU"
        },
        {
            location: "Chelsea, London",
            manager: "Hannah Wilson",
            address: "56 King’s Road, Chelsea, London SW3 4UD"
        }
    ]
};


// Handle the main routes
router.get("/", (req, res) => {
res.render("index.ejs", shopData);
});
router.get("/about", (req, res) => {
res.render("about.ejs", shopData);
});

//Search route
router.get("/search", (req, res) => {
  res.render("search.ejs", shopData);
});

// Search result route
router.get('/search-result', (req, res) => {
  const keyword = req.query.keyword || '';
  const category = req.query.category || '';

  res.render('search-result.ejs', {
    shopName: shopData.shopName,
    keyword: keyword,
    category: category
  });
});


// Category result route
router.get('/category-result', (req, res) => {
  const category = req.query.category; // read selection from the dropdown

  res.render('category-result.ejs', {
    shopName: shopData.shopName,
    category: category
  });
});

// register form
router.get("/register", (req, res) => {
  res.render("register.ejs", shopData);
});

// register confirmation with validation
router.post("/registered", (req, res) => {
  const first = req.body.first || "";
  const last = req.body.last || "";
  const email = req.body.email || "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    // invalid email
    res.send(`
      <h1>${shopData.shopName}</h1>
      <p style="color:red;">Invalid email address. Please go back and try again.</p>
      <a href="/register">Return to Register Page</a>
    `);
  } else {
    // valid email
    res.send(
      `Hello ${first} ${last}, your email (${email}) has been registered successfully!`
    );
  }
});

// SURVEY FORM
router.get("/survey", (req, res) => {
  res.render("survey.ejs", shopData);
});

// SURVEY RESULT
router.post("/survey-result", (req, res) => {
  const first = req.body.first || "";
  const last = req.body.last || "";
  const email = req.body.email || "";
  const age = req.body.age || "";
  const category = req.body.category || "";
  const student = req.body.student ? "Yes" : "No";

  res.render("survey-result.ejs", {
    shopName: shopData.shopName,
    first,
    last,
    email,
    age,
    category,
    student
  });
});


// Export the router object so index.js can access it
module.exports = router;