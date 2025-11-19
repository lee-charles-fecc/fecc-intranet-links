// server.js (CommonJS)

const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

// CONFIG
const PORT = process.env.PORT || 3000;

// THESE ARE *SERVER-SIDE* SECRETS - NOT EXPOSED TO REACT
const INTRANET_USERNAME = process.env.REACT_APP_USERNAME || "";
const INTRANET_PASSWORD = process.env.REACT_APP_PASSWORD || "";

// Middleware
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET || "change-me",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // 24h
        },
    })
);

// --- Auth API ---

// POST /api/login { username, password }
app.post("/api/login", (req, res) => {
    const { username, password } = req.body || {};

    if (username === INTRANET_USERNAME && password === INTRANET_PASSWORD) {
        req.session.user = { username };
        return res.json({ ok: true });
    }

    return res.status(401).json({ ok: false, message: "Invalid credentials" });
});

// GET /api/me -> checks if session exists
app.get("/api/me", (req, res) => {
    if (req.session.user) {
        return res.json({ ok: true, user: req.session.user });
    }
    return res.status(401).json({ ok: false });
});

// POST /api/logout
app.post("/api/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ ok: true });
    });
});

// --- Static React build (CRA) ---

// CRA builds into ./build
const staticDir = path.join(__dirname, "build");

app.use(express.static(staticDir));

// SPA fallback – send index.html for any unknown route
app.get("*", (req, res) => {
    res.sendFile(path.join(staticDir, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
