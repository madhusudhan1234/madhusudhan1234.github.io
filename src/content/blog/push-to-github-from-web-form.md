---
title: 'Push to GitHub from a Web Form'
description: 'Build a Node.js app that turns form submissions into JSON files committed to a GitHub repo using the Contents API.'
pubDate: 'Dec 12 2025'
heroImage: 'images/blogs/form-to-push-github.png'
---

> Note: This article includes AI‑generated content and may contain minor inaccuracies. Please validate steps before use.

Ever wanted to save form submissions directly to GitHub? This guide shows you how to build a simple Node.js app that turns web form data into JSON files stored in your GitHub repository—no complicated git commands required.

## 🎯 What You're Building

A lightweight web app with three main parts:

1. **A submission form** where users enter their name
2. **An automatic save system** that creates numbered JSON files (1.json, 2.json, etc.) in your GitHub repo
3. **A list page** that displays all submitted names

Think of it as a mini-database that lives in GitHub, with full version control built in.

---

## 🚀 Before You Start

Make sure you have:

- **Node.js 18 or newer** installed on your computer
- **A GitHub repository** where you want to store the files
- **A GitHub access token** with write permissions:
  - For classic tokens: enable the `repo` scope
  - For fine-grained tokens: grant "Contents" write access to your target repo

---

## 📁 Project Structure

Your project will have these files:

```
your-project/
├── server.js           # The main Express app
├── public/
│   └── index.html      # The form page
├── .env                # Your private config (never commit this!)
├── .env.example        # Template for required settings
└── package.json        # Node.js dependencies and scripts
```

---

## ⚙️ Step-by-Step Setup

### 1. Install Dependencies

Create a new folder and run:

```bash
npm install express dotenv
```

### 2. Configure Your Environment

Create a `.env` file with your GitHub details:

```env
GITHUB_TOKEN=your_github_token_here
EPISODES_REPO_OWNER=your-username-or-org
EPISODES_REPO_NAME=your-repo-name
EPISODES_BRANCH=main
PORT=3010
```

**Important:** Never commit your `.env` file! Add it to `.gitignore`.

### 3. Add the Code

Copy the complete code for `server.js`, `public/index.html`, and `package.json` from the sections below.

### 4. Start Your Server

```bash
npm start
```

Then open your browser to `http://localhost:3010/`

---

## 💡 How It Works

### When Someone Submits a Name

1. The form sends the name to your server
2. The server checks GitHub to find the highest numbered file (e.g., if 5.json exists, it'll create 6.json)
3. It creates a new JSON file with the format: `{"name": "Alex"}`
4. **A commit message is automatically generated** in the format: `"Add Alex as 6.json"`
5. The file is committed directly to your GitHub repo with this message
6. The user is redirected to see the full list

### When Someone Views the List

1. The server reads all `*.json` files from your repo
2. It extracts the names from each file
3. It displays them in a clean, numbered list

---

## 🔧 The Complete Code

### server.js

This is your main application file. It handles form submissions and talks to GitHub's API.

**Key functions:**
- `ghGetFile()` - Fetches a file from your repo
- `ghPutFile()` - Creates or updates a file in your repo
- `ghListDir()` - Lists all files in a directory
- `POST /submit` - Handles new name submissions
- `GET /list` - Shows all submitted names

```js
require('dotenv').config()
const express = require('express')

const app = express()
const port = process.env.PORT || 3000
const ghToken = process.env.GITHUB_TOKEN || ''
const episodesOwner = process.env.EPISODES_REPO_OWNER || ''
const episodesName = process.env.EPISODES_REPO_NAME || ''
const episodesBranch = process.env.EPISODES_BRANCH || 'main'

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Fetch a file from GitHub
async function ghGetFile(pathInRepo) {
  const url = `https://api.github.com/repos/${episodesOwner}/${episodesName}/contents/${encodeURIComponent(pathInRepo)}?ref=${encodeURIComponent(episodesBranch)}`
  const res = await fetch(url, { 
    headers: { 
      Authorization: `Bearer ${ghToken}`, 
      Accept: 'application/vnd.github+json', 
      'X-GitHub-Api-Version': '2022-11-28' 
    } 
  })
  if (res.status === 404) return { sha: null, content: null }
  const data = await res.json()
  return { sha: data.sha || null, content: data.content || null }
}

// Create or update a file in GitHub
async function ghPutFile(pathInRepo, jsonObject, message) {
  const current = await ghGetFile(pathInRepo)
  const body = {
    message,
    content: Buffer.from(JSON.stringify(jsonObject, null, 2)).toString('base64'),
    branch: episodesBranch
  }
  if (current.sha) body.sha = current.sha
  
  const url = `https://api.github.com/repos/${episodesOwner}/${episodesName}/contents/${encodeURIComponent(pathInRepo)}`
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 
      Authorization: `Bearer ${ghToken}`, 
      Accept: 'application/vnd.github+json', 
      'Content-Type': 'application/json', 
      'X-GitHub-Api-Version': '2022-11-28' 
    },
    body: JSON.stringify(body)
  })
  if (!res.ok) throw new Error('Failed to push to GitHub')
}

// Check if GitHub environment variables are configured
function githubEnvOk() {
  return !!(ghToken && episodesOwner && episodesName && episodesBranch)
}

// List files in a directory
async function ghListDir(dirPath = '') {
  const base = dirPath ? `${encodeURIComponent(dirPath)}` : ''
  const url = `https://api.github.com/repos/${episodesOwner}/${episodesName}/contents/${base}?ref=${encodeURIComponent(episodesBranch)}`
  const res = await fetch(url, { 
    headers: { 
      Authorization: `Bearer ${ghToken}`, 
      Accept: 'application/vnd.github+json', 
      'X-GitHub-Api-Version': '2022-11-28' 
    } 
  })
  if (res.status === 404) return []
  if (!res.ok) throw new Error('Failed to list directory')
  const data = await res.json()
  return Array.isArray(data) ? data : []
}

// Extract name from JSON content
function parseNameFromContent(jsonText) {
  try {
    const v = JSON.parse(jsonText)
    if (typeof v === 'string') return v
    if (Array.isArray(v)) return String(v[0] ?? '')
    if (v && typeof v === 'object') return String(v.name ?? '')
    return ''
  } catch {
    return ''
  }
}

// Handle form submissions
app.post('/submit', (req, res) => {
  const name = (req.body && req.body.name || '').trim()
  if (!name) {
    return res.status(400).send('Name is required')
  }
  
  const proceed = async () => {
    if (!githubEnvOk()) {
      return res.status(500).send('GitHub environment not configured')
    }
    
    // Find the next available number
    let nextIndex = 1
    try {
      const items = await ghListDir('')
      const nums = items
        .map(x => x && x.name)
        .filter(n => typeof n === 'string' && /^\\d+\\.json$/.test(n))
        .map(n => parseInt(n.split('.')[0], 10))
      const max = nums.length ? Math.max(...nums) : 0
      nextIndex = max + 1
    } catch {}
    
    // Save to GitHub
    const payload = { name }
    try {
      await ghPutFile(`${nextIndex}.json`, payload, `Add ${name} as ${nextIndex}.json`)
    } catch {
      return res.status(500).send('Failed to save to GitHub')
    }
    
    return res.redirect('/list')
  }
  
  proceed()
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.send('ok')
})

// Display all submitted names
app.get('/list', async (req, res) => {
  if (!githubEnvOk()) {
    return res.status(500).send('GitHub environment not configured')
  }
  
  let entries = []
  try {
    const items = await ghListDir('')
    const numbered = items.filter(it => 
      it && typeof it.name === 'string' && /^\\d+\\.json$/.test(it.name)
    )
    numbered.sort((a, b) => parseInt(a.name, 10) - parseInt(b.name, 10))
    
    entries = await Promise.all(numbered.map(async it => {
      try {
        const meta = await ghGetFile(it.name)
        const txt = meta.content 
          ? Buffer.from(meta.content, 'base64').toString('utf8') 
          : ''
        const value = parseNameFromContent(txt)
        return { file: it.name, value }
      } catch {
        return { file: it.name, value: '' }
      }
    }))
  } catch {
    entries = []
  }
  
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Submitted Names</title>
    <style>
      body { 
        font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; 
        margin: 0; 
        padding: 40px; 
        background: #f6f7f9; 
      }
      .card { 
        max-width: 640px; 
        margin: 0 auto; 
        background: #fff; 
        border: 1px solid #e5e7eb; 
        border-radius: 10px; 
        padding: 24px; 
        box-shadow: 0 10px 20px rgba(0,0,0,0.04); 
      }
      h1 { font-size: 20px; margin: 0 0 16px; }
      h2 { font-size: 16px; margin: 16px 0 8px; }
      ul { margin: 0; padding-left: 20px; }
      a { 
        display: inline-block; 
        margin-top: 16px; 
        color: #2563eb; 
        text-decoration: none; 
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Submitted Names</h1>
      <h2>Names (${entries.length})</h2>
      <ul>${entries.map(e => `<li>${e.value}</li>`).join('')}</ul>
      <a href="/">Back to form</a>
    </div>
  </body>
</html>`
  
  res.send(html)
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
  if (githubEnvOk()) {
    console.log(`Using GitHub repo ${episodesOwner}/${episodesName}@${episodesBranch}`)
  }
})
```

### public/index.html

This is your form page—simple and clean.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Name Submission Form</title>
    <style>
      body { 
        font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; 
        margin: 0; 
        padding: 40px; 
        background: #f6f7f9; 
      }
      .card { 
        max-width: 420px; 
        margin: 0 auto; 
        background: #fff; 
        border: 1px solid #e5e7eb; 
        border-radius: 10px; 
        padding: 24px; 
        box-shadow: 0 10px 20px rgba(0,0,0,0.04); 
      }
      h1 { font-size: 20px; margin: 0 0 16px; }
      label { 
        display: block; 
        font-size: 14px; 
        color: #374151; 
        margin-bottom: 8px; 
      }
      input[type="text"] { 
        width: 100%; 
        font-size: 16px; 
        padding: 10px 12px; 
        border: 1px solid #d1d5db; 
        border-radius: 8px; 
        outline: none; 
        box-sizing: border-box;
      }
      input[type="text"]:focus { 
        border-color: #2563eb; 
        box-shadow: 0 0 0 3px rgba(37,99,235,0.15); 
      }
      button { 
        margin-top: 16px; 
        width: 100%; 
        background: #2563eb; 
        color: #fff; 
        border: 0; 
        border-radius: 8px; 
        padding: 10px 12px; 
        font-size: 16px; 
        cursor: pointer; 
      }
      button:hover { background: #1e40af; }
      a { 
        display: inline-block; 
        margin-top: 12px; 
        color: #2563eb; 
        text-decoration: none; 
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Submit Your Name</h1>
      <form action="/submit" method="post">
        <label for="name">Name</label>
        <input id="name" name="name" type="text" required />
        <button type="submit">Save to GitHub</button>
      </form>
      <a href="/list">View all submitted names</a>
    </div>
  </body>
</html>
```

### package.json

```json
{
  "name": "github-form-app",
  "version": "1.0.0",
  "private": true,
  "type": "commonjs",
  "scripts": {
    "start": "node server.js",
    "dev": "NODE_ENV=development node server.js"
  },
  "dependencies": {
    "express": "^4.19.2",
    "dotenv": "^16.4.5"
  }
}
```

### .env.example

Create this as a template for others (safe to commit):

```env
GITHUB_TOKEN=
EPISODES_REPO_OWNER=
EPISODES_REPO_NAME=
EPISODES_BRANCH=main
PORT=3010
```

---

## 🎨 Ideas for Customization

Once you have the basics working, try these enhancements:

- **Add more fields** like email, timestamp, or categories
- **Organize files** into folders like `data/submissions/1.json`
- **Add validation** to prevent duplicate names
- **Sort by date** showing newest submissions first
- **Add authentication** to protect your form
- **Style improvements** with your brand colors
- **CSV export** to download all submissions

---

## 🔍 Understanding the GitHub API

This app uses GitHub's Contents API, which lets you:

- **Read files:** `GET /repos/:owner/:repo/contents/:path`
- **Create/update files:** `PUT /repos/:owner/:repo/contents/:path`

The API returns file content as base64-encoded text, which the app automatically decodes into regular JSON.

### How Commit Messages Work

Every time a file is created or updated in GitHub, you need to provide a commit message. In this app, the commit message is automatically generated in the `ghPutFile()` function:

```js
await ghPutFile(`${nextIndex}.json`, payload, `Add ${name} as ${nextIndex}.json`)
```

This creates descriptive commits like:
- `"Add Alex as 1.json"`
- `"Add Jordan as 2.json"`
- `"Add Sam as 3.json"`

The commit message is passed as the third parameter and sent to GitHub in the API request body:

```js
const body = {
  message,  // This is your commit message
  content: Buffer.from(JSON.stringify(jsonObject, null, 2)).toString('base64'),
  branch: episodesBranch
}
```

**Why this matters:** These commit messages create a full audit trail in your GitHub repository. You can see exactly who was added and when by checking the commit history. This is one of the key advantages of using GitHub as a data store—every change is tracked automatically!

---

## ✅ Testing Your App

1. Visit `http://localhost:3010/`
2. Submit a name through the form
3. Check your GitHub repo—you should see `1.json` with your data
4. Click "View submitted names" to see the list
5. Submit more names and watch the numbers increment

---

## 🚨 Troubleshooting

**"GitHub environment not configured"**  
→ Double-check your `.env` file has all required variables

**"Failed to push to GitHub"**  
→ Verify your token has write permissions for the repo

**Form submits but no file appears**  
→ Check your repo name and branch are correct in `.env`

**Port already in use**  
→ Change the `PORT` value in your `.env` file

---

## 🎯 Why Use This Approach?

Using GitHub as a data store gives you:

- **Free hosting** for your data
- **Version control** for every change
- **Easy backup** through Git
- **Simple rollback** if something goes wrong
- **Transparency** with a full audit trail

It's perfect for small projects, prototypes, or situations where you want simple data persistence without setting up a database.

---

## 📚 Next Steps

Now that you have a working app, you could:

- Deploy it to a service like Railway, Render, or Vercel
- Add a delete function to remove entries
- Create a dashboard to visualize the data
- Connect it to a real form on your website
- Expand it to handle different types of data

Happy coding! 🚀

