# 📝 Notes App - Single Page Application

A full-stack notes application demonstrating request-response flow and basic data storage. Users can write, save, and manage notes with a clean, modern interface.

## 🎯 Features

- ✍️ **Write Notes**: Create notes with title and content
- 💾 **Save to Database**: Notes are persisted in a database
- 📋 **View All Notes**: Display all saved notes on the same page
- 🗑️ **Delete Notes**: Remove notes you no longer need
- 🎨 **Modern UI**: Clean, responsive design
- ⚡ **Real-time Updates**: Notes load and display instantly
- 🔒 **Data Validation**: Input validation on both frontend and backend

## 🏗️ Project Structure

```
saving-notes/
├── index.html          # Frontend HTML structure
├── styles.css          # Frontend styling
├── script.js           # Frontend JavaScript logic
├── app.py              # Python Flask backend
├── requirements.txt    # Python dependencies
├── .env.example        # Environment configuration template
└── README.md           # This file
```

## 🛠️ Tech Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables
- **JavaScript (ES6+)**: Fetch API for HTTP requests, DOM manipulation

### Backend
- **Python 3.x**: Programming language
- **Flask**: Lightweight web framework
- **SQLAlchemy**: ORM for database management
- **Flask-CORS**: Cross-Origin Resource Sharing support
- **SQLite**: Default database (can use PostgreSQL, MySQL, etc.)

## 📋 Requirements

- Python 3.8+
- pip (Python package manager)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: Virtual environment (recommended)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/gattulokesh68-netizen/saving-notes.git
cd saving-notes
```

### 2. Set Up Python Virtual Environment (Recommended)

#### On macOS/Linux:
```bash
python3 -m venv venv
source venv/bin/activate
```

#### On Windows:
```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` if needed (defaults should work for local development):
```
FLASK_ENV=development
FLASK_DEBUG=True
DATABASE_URL=sqlite:///notes.db
```

### 5. Start the Backend Server

```bash
python app.py
```

You should see:
```
 * Running on http://0.0.0.0:5000
```

### 6. Open the Frontend in Browser

Open a new terminal and navigate to the project directory:

```bash
# Using Python's built-in HTTP server (recommended)
python -m http.server 8000
```

Then open your browser and go to:
```
http://localhost:8000
```

Alternatively, you can use other local servers:
```bash
# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

## 📚 API Endpoints

### Get All Notes
```
GET /api/notes
```
Returns a list of all notes sorted by creation date (newest first).

**Response:**
```json
[
  {
    "id": 1,
    "title": "My First Note",
    "content": "This is the content",
    "created_at": "2026-06-27T12:00:00",
    "updated_at": "2026-06-27T12:00:00"
  }
]
```

### Create a New Note
```
POST /api/notes
Content-Type: application/json

{
  "title": "Note Title",
  "content": "Note content here"
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Note Title",
  "content": "Note content here",
  "created_at": "2026-06-27T12:00:00",
  "updated_at": "2026-06-27T12:00:00"
}
```

### Get a Specific Note
```
GET /api/notes/<id>
```

### Update a Note
```
PUT /api/notes/<id>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content"
}
```

### Delete a Note
```
DELETE /api/notes/<id>
```

**Response:**
```json
{
  "message": "Note deleted successfully"
}
```

### Health Check
```
GET /api/health
```

## 🗄️ Database Schema

### Notes Table

| Column | Type | Description |
|--------|------|-------------|
| id | Integer | Primary key, auto-increment |
| title | String(100) | Note title (required) |
| content | Text | Note content (required) |
| created_at | DateTime | Creation timestamp |
| updated_at | DateTime | Last update timestamp |

## 💻 How It Works

### Frontend Flow
1. User enters note title and content
2. User clicks "Save Note" button
3. JavaScript validates input
4. Fetch API sends POST request to backend
5. Backend creates and stores the note
6. Frontend receives response
7. Notes list is refreshed automatically
8. Form is cleared for next note

### Backend Flow
1. Flask receives POST request to `/api/notes`
2. Validates data (title and content not empty)
3. Creates new Note object with SQLAlchemy
4. Saves to SQLite database
5. Returns JSON response with created note
6. CORS headers allow frontend to receive response

## 🔒 Security Features

- **Input Validation**: Both frontend and backend validate data
- **HTML Escaping**: Prevents XSS attacks by escaping user content
- **CORS Support**: Controlled cross-origin requests
- **Error Handling**: Comprehensive error handling with meaningful messages

## 🧪 Testing the Application

### Create a Note
1. Enter title: "My First Note"
2. Enter content: "This is my first note!"
3. Click "Save Note"
4. See success message and note appears in the list

### Edit a Note
Currently, notes cannot be edited directly. To update a note:
1. Delete the existing note
2. Create a new note with updated content

### Delete a Note
1. Click "Delete" button on any note card
2. Confirm deletion in the popup
3. Note is removed from the list

## 🐛 Troubleshooting

### Backend won't start
```
Error: ModuleNotFoundError: No module named 'flask'
```
**Solution:** Ensure you've installed dependencies: `pip install -r requirements.txt`

### CORS error in browser console
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:** 
- Ensure backend is running on `http://localhost:5000`
- Check that Flask-CORS is installed
- Verify the CORS configuration in `app.py`

### Notes not loading
- Check browser console for errors (F12 → Console tab)
- Ensure backend is running (`python app.py`)
- Check that both frontend and backend URLs are correct in `script.js`

### Database file not created
- Check that you have write permissions in the project directory
- Ensure `FLASK_ENV=development` in `.env`
- Try deleting any existing `notes.db` file and restart the backend

## 📈 Future Enhancements

- Edit existing notes
- Search and filter notes
- Sort notes by date or title
- Export notes to file
- Dark mode
- User authentication
- Note categories/tags
- Rich text editor
- Markdown support
- Cloud synchronization

## 📝 Code Examples

### Creating a Note (JavaScript)
```javascript
const response = await fetch('http://localhost:5000/api/notes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title, content })
});
const note = await response.json();
```

### Creating a Note (Python)
```python
@app.route('/api/notes', methods=['POST'])
def create_note():
    data = request.get_json()
    note = Note(title=data['title'], content=data['content'])
    db.session.add(note)
    db.session.commit()
    return jsonify(note.to_dict()), 201
```

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created by gattulokesh68-netizen

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for any improvements.

---

**Happy Note Taking! 📝**
