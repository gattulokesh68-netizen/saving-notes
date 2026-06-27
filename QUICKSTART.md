# 🚀 Quick Start Guide

Get the Notes App up and running in 5 minutes!

## Prerequisites

- Python 3.8 or higher installed
- pip (comes with Python)
- A modern web browser

## Installation (5 minutes)

### Step 1: Clone and Navigate
```bash
git clone https://github.com/gattulokesh68-netizen/saving-notes.git
cd saving-notes
```

### Step 2: Create Virtual Environment
```bash
# On macOS/Linux
python3 -m venv venv
source venv/bin/activate

# On Windows
python -m venv venv
venv\Scripts\activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Run Backend
```bash
python app.py
```
✅ You should see: `Running on http://0.0.0.0:5000`

### Step 5: Run Frontend (New Terminal)
```bash
cd saving-notes
python -m http.server 8000
```
✅ You should see: `Serving HTTP on 0.0.0.0 port 8000`

### Step 6: Open in Browser
Open your browser and go to:
```
http://localhost:8000
```

## 🎉 You're Done!

Start creating notes:
1. Type a title
2. Type your note content
3. Click "Save Note"
4. See your note appear below!

## Common Issues & Fixes

| Problem | Solution |
|---------|----------|
| `ModuleNotFoundError: No module named 'flask'` | Run: `pip install -r requirements.txt` |
| Backend won't start | Make sure you're in the virtual environment |
| CORS error in console | Ensure backend runs on port 5000 |
| Notes not saving | Check browser console (F12) for errors |

## Project Structure
```
saving-notes/
├── index.html       ← Open this in browser
├── styles.css       ← Styling
├── script.js        ← Frontend logic
├── app.py           ← Backend server
├── requirements.txt ← Python packages
└── README.md        ← Full documentation
```

## Next Steps

- Read [README.md](README.md) for detailed documentation
- Explore the API endpoints in the README
- Try creating, viewing, and deleting notes
- Check the code comments for implementation details

## Useful Commands

```bash
# Activate virtual environment
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# Deactivate virtual environment
deactivate

# Update dependencies
pip install -r requirements.txt --upgrade

# View running services
# Backend: http://localhost:5000/api/health
# Frontend: http://localhost:8000
```

## API Quick Reference

```bash
# Get all notes
curl http://localhost:5000/api/notes

# Create note
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","content":"Hello"}'

# Delete note (replace 1 with note ID)
curl -X DELETE http://localhost:5000/api/notes/1

# Health check
curl http://localhost:5000/api/health
```

---

**Need help?** Check README.md for detailed documentation or look at the troubleshooting section.

**Happy coding! 🎉**
