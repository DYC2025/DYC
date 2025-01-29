const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { use } = require("passport");
const app = express();
var selectedCourse1;
var fc;
// Middleware
app.use(bodyParser.json());
app.use(cors());


// Connect to MongoDB
mongoose.connect("mongodb+srv://cubeboardtech:Bsam191004@cluster0.v6b6a.mongodb.net/infodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

// User Schema
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  course: { type: String },
  initial: { type: Number },
  state: { type: Number },
  completedcourses:{type:Array},
});


// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);

// Registration Route
app.post("/register", async (req, res) => {
  const { firstname, lastname, username, password } = req.body;
  const initial=0;
  const states=0;
  if (!firstname || !lastname || !username || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const newUser = new User({ firstname, lastname, username, password, initial,states });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login Route with JWT Token
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, 'cbt', { expiresIn: '1h' });

    res.json({ message: "Logged in successfully", token, i_status:user.initial });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization") && req.header("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, 'cbt', (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

// Profile Route (protected)
app.get("/profile", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
});

app.post("/update-course", authenticateJWT, async (req, res) => {
  const { course } = req.body;
  
  selectedCourse=course;
  if (!course) {
    return res.status(400).json({ message: "Course is required!" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    user.course = course;
    selectedCourse=user.course;
    user.initial = 1;
    user.state=0; // Assuming this indicates the initial test has been started
    await user.save();
    res.json({ message: "Course updated successfully!" ,user: user});
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Error updating course" });
  }
});

app.get("/test", authenticateJWT, async (req, res) => {
  try {
    const selecte = await User.findById(req.user.id);
    selectedCourse1=selecte.course;
    const url=`https://testapi-t2fc.onrender.com/python`;
    const response = await axios.get(url.trim());
    res.json(response.data);  
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    res.status(500).json({ message: "Failed to fetch courses." });
  }
});
app.get("/finaltest", authenticateJWT, async (req, res) => {
  try {
    const selecte = await User.findById(req.user.id);
    selectedCourse1=selecte.course;

    
        if (selectedCourse1 === 'advancedjava') {
          fc='java';
        } else if (selectedCourse1 === 'advancedpython') {
          fc='python';
        } else {
          fc=selectedCourse1;
        }
    const url=`https://testapi-t2fc.onrender.com/javafa`;
    console.log(url)
    const response = await axios.get(url.trim());
    res.json(response.data);  
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    res.status(500).json({ message: "Failed to fetch courses." });
  }
});
app.get("/courses", authenticateJWT, async (req, res) => {
try {
  const selecte = await User.findById(req.user.id);
  selectedCourse1=selecte.course;
  // const url=`https://testapi-t2fc.onrender.com/python`;
  const url=`https://api-1-ycbp.onrender.com/${selectedCourse1}`
  // const url=`http://localhost:8000/${selectedCourse1}`
  const response = await axios.get(url.trim());
  res.json(response.data); 
} catch (error) {
  console.error("Error fetching courses:", error.message);
  res.status(500).json({ message: "Failed to fetch courses." });
}
});

// Save Results Route
app.post("/save-results", authenticateJWT, async (req, res) => {
const { correctAnswers, willing } = req.body;

if (typeof correctAnswers !== "number") {
  return res.status(400).json({ message: "Invalid input for correct answers." });
}

try {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  console.log("User found:", user);

  // Update course based on conditions
  if (correctAnswers >= 5 && willing === 1) {
    user.course = 'advancedjava';
  } else {
    user.course =user.course;
  }

  user.initial = correctAnswers; // Update initial field

  console.log("Updated course:", user.course);
  
  // Save changes
  await user.save();

  // Verify changes by re-fetching from DB
  const updatedUser = await User.findById(req.user.id);
  console.log("Final course in DB:", updatedUser.course);

  res.json({ message: "Results saved successfully!", course: updatedUser.course });
} catch (error) {
  console.error("Error saving results:", error);
  res.status(500).json({ message: "Failed to save results." });
}
});




app.post("/complete", authenticateJWT, async (req, res) => {
  
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    user.completedcourses.push(user.course); 
    await user.save();
    res.json({ message: "Course updated successfully!" });
    console.log("Hello"+user.completedcourses);
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Error updating course" });
  }
});





app.post("/save-result-again", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
  
    console.log("User found:", user);
  
    // Update course based on conditions
   
    user.course =user.course;
   
  
     // Update initial field
  
    
    user.state=0;
    // Save changes
    await user.save();
  
    // Verify changes by re-fetching from DB
    res.json({ message: "Results saved successfully!" });
  } catch (error) {
    console.error("Error saving results:", error);
    res.status(500).json({ message: "Failed to save results." });
  }
  });

app.post("/save-current-state", authenticateJWT, async (req, res) => {
const {currentstate} = req.body;

if (typeof currentstate !== "number") {
  return res.status(400).json({ message: "Invalid input for correct answers." });
}

try {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  // Save the number of correct answers (You can extend the schema to save a history of tests)
  
  user.state = currentstate; // Update the `initial` field to store the result
  
  await user.save();
  res.json({ message: "state saved successfully!" });
} catch (error) {
  console.error("Error saving state:", error);
  res.status(500).json({ message: "Failed to save state." });
}
});


// Server listener
const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});