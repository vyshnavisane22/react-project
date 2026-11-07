const express = require("express");
const cors = require("cors");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 5000;
const dbPath = path.join(__dirname, "jobportal.db");

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to SQLite database:", dbPath);
  }
});

const run = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });

const get = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });

const all = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });

const seedCompanies = [
  {
    name: "Apple",
    founder: "Steve Jobs, Steve Wozniak, Ronald Wayne",
    history: "Founded in 1976, Apple started as a personal computer company and later became one of the largest technology companies in the world.",
    location: "Hyderabad",
    employees: "160,000+",
    salary: "₹10 LPA - ₹35 LPA",
    technologies: "Swift, React, Node.js, AI, Cloud",
    jobs: "Software Developer, UI Designer, Data Analyst",
    desc: "Product based IT company",
    type: "Product",
    rating: 5,
  },
  { name: "Infosys", location: "Hyderabad", desc: "Service IT company", type: "Service", rating: 3 },
  { name: "TCS", location: "Hyderabad", desc: "Software services", type: "Service", rating: 4 },
  {
    name: "Microsoft",
    founder: "Bill Gates, Paul Allen",
    history: "Founded in 1975, Microsoft is known for Windows OS, Office Suite, and Azure cloud platform.",
    location: "Bangalore",
    employees: "220,000+",
    salary: "₹12 LPA - ₹40 LPA",
    technologies: ".NET, React, Azure Cloud, AI",
    jobs: "Software Engineer, Cloud Engineer, Data Scientist",
    desc: "Cloud and software",
    type: "Product",
    rating: 5,
  },
  { name: "Google", location: "Bangalore", desc: "AI and search", type: "Product", rating: 5 },
  { name: "Wipro", location: "Bangalore", desc: "IT services", type: "Service", rating: 3 },
  {
    name: "Amazon",
    founder: "Jeff Bezos",
    history: "Founded in 1994 as an online bookstore, Amazon is now a global leader in e-commerce and cloud computing.",
    location: "Chennai",
    employees: "1,500,000+",
    salary: "₹8 LPA - ₹30 LPA",
    technologies: "Java, AWS, React, Node.js",
    jobs: "Backend Developer, DevOps Engineer, Product Manager",
    desc: "AWS and web services",
    type: "Product",
    rating: 5,
  },
  { name: "Zoho", location: "Chennai", desc: "Product company", type: "Product", rating: 4 },
  { name: "IBM", location: "Pune", desc: "Cloud and AI", type: "Product", rating: 4 },
  { name: "Accenture", location: "Pune", desc: "IT consulting", type: "Service", rating: 4 },
  { name: "Capgemini", location: "Mumbai", desc: "Software company", type: "Service", rating: 3 },
  { name: "Cognizant", location: "Mumbai", desc: "IT services", type: "Service", rating: 3 },
  { name: "Adobe", location: "Bangalore", desc: "Creative software company", type: "Product", rating: 4 },
  { name: "Cisco", location: "Bangalore", desc: "Networking and security", type: "Product", rating: 4 },
  { name: "Dell", location: "Hyderabad", desc: "Hardware and IT services", type: "Product", rating: 3 },
  { name: "Deloitte", location: "Hyderabad", desc: "Consulting and IT services", type: "Service", rating: 4 },
  { name: "HCL", location: "Noida", desc: "IT services and products", type: "Service", rating: 3 },
  { name: "HP", location: "Bangalore", desc: "Hardware and IT services", type: "Product", rating: 3 },
  { name: "Intel", location: "Bangalore", desc: "Semiconductor and software", type: "Product", rating: 4 },
  { name: "L&T Infotech", location: "Mumbai", desc: "IT services", type: "Service", rating: 3 },
  { name: "Meta", location: "Bangalore", desc: "Social media and AI", type: "Product", rating: 5 },
  { name: "Mindtree", location: "Bangalore", desc: "IT services", type: "Service", rating: 3 },
  { name: "Oracle", location: "Bangalore", desc: "Database and cloud software", type: "Product", rating: 4 },
  { name: "Paytm", location: "Delhi", desc: "Fintech and payments", type: "Product", rating: 4 },
  { name: "Persistent", location: "Pune", desc: "Software and IT services", type: "Service", rating: 3 },
  { name: "Samsung", location: "Bangalore", desc: "Electronics and IT services", type: "Product", rating: 4 },
  { name: "Tech Mahindra", location: "Pune", desc: "IT services and consulting", type: "Service", rating: 3 },
];

const seedJobs = [
  { company: "TCS", role: "Software Engineer", salary: "6 LPA", rating: 4, type: "Service", location: "Hyderabad" },
  { company: "Infosys", role: "Software Engineer", salary: "5.5 LPA", rating: 3, type: "Service", location: "Bangalore" },
  { company: "Wipro", role: "Software Engineer", salary: "6 LPA", rating: 3, type: "Service", location: "Chennai" },
  { company: "Infosys", role: "Python Developer", salary: "5 LPA", rating: 3, type: "Service", location: "Bangalore" },
  { company: "TCS", role: "Python Developer", salary: "6 LPA", rating: 4, type: "Service", location: "Hyderabad" },
  { company: "Wipro", role: "Java Developer", salary: "5.5 LPA", rating: 3, type: "Service", location: "Chennai" },
  { company: "Accenture", role: "Java Developer", salary: "7 LPA", rating: 4, type: "Service", location: "Pune" },
  { company: "Zoho", role: "Web Developer", salary: "8 LPA", rating: 4, type: "Product", location: "Chennai" },
  { company: "TCS", role: "Web Developer", salary: "6 LPA", rating: 3, type: "Service", location: "Hyderabad" },
  { company: "IBM", role: "Data Scientist", salary: "12 LPA", rating: 4, type: "Product", location: "Pune" },
  { company: "Google", role: "AI Engineer", salary: "25 LPA", rating: 5, type: "Product", location: "Hyderabad" },
  { company: "Amazon", role: "Cloud Engineer", salary: "22 LPA", rating: 5, type: "Product", location: "Bangalore" },
  { company: "Microsoft", role: "DevOps Engineer", salary: "18 LPA", rating: 5, type: "Product", location: "Hyderabad" },
  { company: "Accenture", role: "Full Stack Developer", salary: "7 LPA", rating: 4, type: "Service", location: "Chennai" },
  { company: "Meta", role: "Frontend Developer", salary: "20 LPA", rating: 5, type: "Product", location: "Bangalore" },
  { company: "HCL", role: "Backend Developer", salary: "6 LPA", rating: 3, type: "Service", location: "Noida" },
  { company: "Deloitte", role: "Cyber Security", salary: "10 LPA", rating: 4, type: "Service", location: "Hyderabad" },
  { company: "Capgemini", role: "Testing Engineer", salary: "4.5 LPA", rating: 3, type: "Service", location: "Hyderabad" },
  { company: "Paytm", role: "Mobile App Developer", salary: "11 LPA", rating: 4, type: "Product", location: "Delhi" },
  { company: "Cisco", role: "Network Engineer", salary: "9 LPA", rating: 4, type: "Product", location: "Bangalore" },
  { company: "Oracle", role: "Database Developer", salary: "10 LPA", rating: 4, type: "Product", location: "Bangalore" },
];

const seedTechnologies = [
  { name: "react", category: "Framework", popularity: 90, companies: ["Google", "Facebook", "Netflix", "Amazon"] },
  { name: "angular", category: "Framework", popularity: 75, companies: ["Infosys", "Capgemini", "Cognizant"] },
  { name: "vue", category: "Framework", popularity: 70, companies: ["Alibaba", "GitLab"] },
  { name: "java", category: "Language", popularity: 85, companies: ["TCS", "Infosys", "Wipro"] },
  { name: "python", category: "Language", popularity: 88, companies: ["Google", "Microsoft", "IBM"] },
  { name: "javascript", category: "Scripting", popularity: 92, companies: ["Google", "Meta", "Amazon"] },
  { name: "node", category: "Runtime", popularity: 82, companies: ["Paytm", "Flipkart"] },
  { name: "spring", category: "Framework", popularity: 76, companies: ["TCS", "Infosys"] },
  { name: "mysql", category: "Database", popularity: 80, companies: ["Oracle", "IBM"] },
  { name: "mongodb", category: "Database", popularity: 79, companies: ["Uber", "Netflix"] },
  { name: "cloud", category: "Cloud", popularity: 92, companies: ["AWS", "Google", "Microsoft"] },
  { name: "aws", category: "Cloud", popularity: 91, companies: ["Amazon", "Netflix"] },
  { name: "devops", category: "Tool", popularity: 84, companies: ["Amazon", "Infosys"] },
  { name: "docker", category: "Tool", popularity: 77, companies: ["Google", "Amazon"] },
  { name: "kubernetes", category: "Tool", popularity: 83, companies: ["Google", "Microsoft"] },
  { name: "ai", category: "Technology", popularity: 95, companies: ["OpenAI", "Google"] },
];

const seedDatabase = async () => {
  for (const c of seedCompanies) {
    const slug = c.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    const emailOrPhone = c.emailOrPhone || `${slug}@example.com`;
    const password = c.password || "password123";
    await run(
      `INSERT OR IGNORE INTO companies
        (name, founder, history, location, employees, salary, technologies, jobs, desc, type, rating, emailOrPhone, password)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        c.name,
        c.founder || "",
        c.history || "",
        c.location || "",
        c.employees || "",
        c.salary || "",
        c.technologies || "",
        c.jobs || "",
        c.desc || "",
        c.type || "Service",
        c.rating || 3,
        emailOrPhone,
        password,
      ]
    );
  }

  const companyRows = await all("SELECT id, name FROM companies");
  const companyMap = {};
  companyRows.forEach((r) => {
    companyMap[r.name] = r.id;
  });

  for (const j of seedJobs) {
    const companyId = companyMap[j.company];
    if (!companyId) continue;
    await run(
      `INSERT INTO jobs (companyId, role, salary, rating, type, location)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [companyId, j.role, j.salary, j.rating, j.type, j.location]
    );
  }

  for (const t of seedTechnologies) {
    await run(
      `INSERT OR IGNORE INTO technologies (name, category, popularity)
       VALUES (?, ?, ?)`,
      [t.name, t.category, t.popularity]
    );
  }

  const techRows = await all("SELECT id, name FROM technologies");
  const techMap = {};
  techRows.forEach((r) => {
    techMap[r.name] = r.id;
  });

  for (const t of seedTechnologies) {
    const techId = techMap[t.name];
    if (!techId) continue;
    for (const companyName of t.companies) {
      await run(
        `INSERT INTO tech_companies (technologyId, companyName)
         VALUES (?, ?)`,
        [techId, companyName]
      );
    }
  }

  console.log("Database seeded successfully");
};

const initializeDatabase = async () => {
  try {
    await run(`
      CREATE TABLE IF NOT EXISTS companies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        founder TEXT,
        history TEXT,
        location TEXT,
        employees TEXT,
        salary TEXT,
        technologies TEXT,
        jobs TEXT,
        desc TEXT,
        type TEXT,
        rating INTEGER,
        emailOrPhone TEXT,
        password TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        companyId INTEGER,
        role TEXT NOT NULL,
        salary TEXT,
        rating INTEGER,
        type TEXT,
        location TEXT,
        FOREIGN KEY (companyId) REFERENCES companies(id)
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS technologies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        category TEXT,
        popularity INTEGER
      )
    `);

    await run(`
      CREATE TABLE IF NOT EXISTS tech_companies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        technologyId INTEGER,
        companyName TEXT,
        FOREIGN KEY (technologyId) REFERENCES technologies(id)
      )
    `);

    const countRow = await get("SELECT COUNT(*) as count FROM companies");
    if (countRow.count === 0) {
      await seedDatabase();
    }

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Database initialization failed:", err.message);
  }
};

app.get("/", (req, res) => {
  res.json({ message: "Job portal backend is running" });
});

app.post("/api/companies/signup", async (req, res) => {
  try {
    const { name, emailOrPhone, password } = req.body;

    if (!name || !emailOrPhone || !password) {
      return res.status(400).json({ message: "Name, email or phone, and password are required" });
    }

    const existing = await get("SELECT id FROM companies WHERE emailOrPhone = ?", [emailOrPhone]);
    if (existing) {
      return res.status(409).json({ message: "Email or phone already registered" });
    }

    const result = await run(
      `INSERT INTO companies (name, emailOrPhone, password, location, desc, type, rating)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, emailOrPhone, password, "India", "New company", "Service", 3]
    );

    return res.status(201).json({
      message: "Company details saved successfully",
      id: result.lastID,
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    return res.status(500).json({ message: "Failed to save company details" });
  }
});

app.post("/api/companies/login", async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({ message: "Email or phone and password are required" });
    }

    const company = await get(
      "SELECT id, name, emailOrPhone, location, desc, type, rating FROM companies WHERE emailOrPhone = ? AND password = ?",
      [emailOrPhone, password]
    );

    if (!company) {
      return res.status(401).json({ message: "Invalid email/phone or password" });
    }

    return res.status(200).json({ message: "Login successful", company });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ message: "Login failed" });
  }
});

app.get("/api/companies/directory", async (req, res) => {
  try {
    const rows = await all(
      `SELECT id, name, founder, history, location, employees, salary, technologies, jobs
       FROM companies
       WHERE founder IS NOT NULL AND founder != ''
       ORDER BY name`
    );
    return res.status(200).json(rows);
  } catch (err) {
    console.error("Directory error:", err.message);
    return res.status(500).json({ message: "Failed to fetch company directory" });
  }
});

app.get("/api/companies", async (req, res) => {
  try {
    const rows = await all(
      `SELECT id, name, location, desc, type, rating
       FROM companies
       ORDER BY name`
    );
    return res.status(200).json(rows);
  } catch (err) {
    console.error("Companies error:", err.message);
    return res.status(500).json({ message: "Failed to fetch companies" });
  }
});

app.get("/api/companies/names", async (req, res) => {
  try {
    const rows = await all("SELECT name FROM companies ORDER BY name");
    return res.status(200).json(rows.map((r) => r.name));
  } catch (err) {
    console.error("Company names error:", err.message);
    return res.status(500).json({ message: "Failed to fetch company names" });
  }
});

app.get("/api/jobs", async (req, res) => {
  try {
    const { role } = req.query;
    let rows;
    if (role) {
      rows = await all(
        `SELECT j.id, j.role, j.salary, j.rating, j.type, j.location, c.name as companyName
         FROM jobs j
         JOIN companies c ON j.companyId = c.id
         WHERE j.role LIKE ?
         ORDER BY j.role, c.name`,
        [`%${role}%`]
      );
    } else {
      rows = await all(
        `SELECT j.id, j.role, j.salary, j.rating, j.type, j.location, c.name as companyName
         FROM jobs j
         JOIN companies c ON j.companyId = c.id
         ORDER BY j.role, c.name`
      );
    }
    return res.status(200).json(rows);
  } catch (err) {
    console.error("Jobs error:", err.message);
    return res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

app.get("/api/roles", async (req, res) => {
  try {
    const rows = await all("SELECT DISTINCT role FROM jobs ORDER BY role");
    return res.status(200).json(rows.map((r) => r.role));
  } catch (err) {
    console.error("Roles error:", err.message);
    return res.status(500).json({ message: "Failed to fetch roles" });
  }
});

app.get("/api/technologies", async (req, res) => {
  try {
    const rows = await all("SELECT * FROM technologies ORDER BY name");
    return res.status(200).json(rows);
  } catch (err) {
    console.error("Technologies error:", err.message);
    return res.status(500).json({ message: "Failed to fetch technologies" });
  }
});

app.get("/api/technologies/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const tech = await get("SELECT * FROM technologies WHERE LOWER(name) = LOWER(?)", [name]);
    if (!tech) {
      return res.status(404).json({ message: "Technology not found" });
    }
    const companies = await all(
      "SELECT companyName FROM tech_companies WHERE technologyId = ? ORDER BY companyName",
      [tech.id]
    );
    return res.status(200).json({
      ...tech,
      companies: companies.map((c) => c.companyName),
    });
  } catch (err) {
    console.error("Technology detail error:", err.message);
    return res.status(500).json({ message: "Failed to fetch technology details" });
  }
});

app.get("/api/companies/compare", async (req, res) => {
  try {
    const { name1, name2 } = req.query;

    if (!name1 || !name2) {
      return res.status(400).json({ message: "name1 and name2 are required" });
    }

    const fetchCompany = async (name) => {
      const company = await get(
        `SELECT id, name, founder, history, location, employees, salary, technologies, jobs, desc, type, rating
         FROM companies
         WHERE LOWER(name) = LOWER(?)`,
        [name]
      );

      if (!company) return null;

      const jobList = await all(
        `SELECT role, salary, rating, type, location
         FROM jobs
         WHERE companyId = ?
         ORDER BY role`,
        [company.id]
      );

      return { ...company, jobList };
    };

    const [company1, company2] = await Promise.all([fetchCompany(name1), fetchCompany(name2)]);

    if (!company1 || !company2) {
      return res.status(404).json({ message: "One or both companies not found" });
    }

    return res.status(200).json({ company1, company2 });
  } catch (err) {
    console.error("Compare error:", err.message);
    return res.status(500).json({ message: "Failed to compare companies" });
  }
});

initializeDatabase();
