import dotenv from "dotenv";
import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import nocache from "nocache";
import adminRoutes from "./routes/admin.js";
import connectDB from "./config/connectDB.js";

dotenv.config();

const app = express();

connectDB();


// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(nocache());

app.use(expressLayouts);
app.set("layout", "layout"); // layout.ejs

// Static files
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

// Routes

app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.render("admin/dashboard");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`http://localhost:5000/`);
});

export default app;