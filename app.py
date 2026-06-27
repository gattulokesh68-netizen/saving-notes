from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///notes.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSON_SORT_KEYS'] = False

# Initialize extensions
db = SQLAlchemy(app)
CORS(app)

# Database Model
class Note(db.Model):
    """Note model for database"""
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        """Convert note to dictionary"""
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
        }

# Routes

@app.route('/api/notes', methods=['GET'])
def get_notes():
    """Get all notes"""
    try:
        notes = Note.query.order_by(Note.created_at.desc()).all()
        return jsonify([note.to_dict() for note in notes]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/notes', methods=['POST'])
def create_note():
    """Create a new note"""
    try:
        data = request.get_json()

        # Validation
        if not data or 'title' not in data or 'content' not in data:
            return jsonify({'error': 'Missing title or content'}), 400

        title = data.get('title', '').strip()
        content = data.get('content', '').strip()

        if not title:
            return jsonify({'error': 'Title cannot be empty'}), 400

        if not content:
            return jsonify({'error': 'Content cannot be empty'}), 400

        # Create note
        note = Note(title=title, content=content)
        db.session.add(note)
        db.session.commit()

        return jsonify(note.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/notes/<int:note_id>', methods=['GET'])
def get_note(note_id):
    """Get a specific note by ID"""
    try:
        note = Note.query.get(note_id)

        if not note:
            return jsonify({'error': 'Note not found'}), 404

        return jsonify(note.to_dict()), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/notes/<int:note_id>', methods=['PUT'])
def update_note(note_id):
    """Update a note"""
    try:
        note = Note.query.get(note_id)

        if not note:
            return jsonify({'error': 'Note not found'}), 404

        data = request.get_json()

        # Update fields
        if 'title' in data:
            title = data.get('title', '').strip()
            if title:
                note.title = title
            else:
                return jsonify({'error': 'Title cannot be empty'}), 400

        if 'content' in data:
            content = data.get('content', '').strip()
            if content:
                note.content = content
            else:
                return jsonify({'error': 'Content cannot be empty'}), 400

        note.updated_at = datetime.utcnow()
        db.session.commit()

        return jsonify(note.to_dict()), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/notes/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    """Delete a note"""
    try:
        note = Note.query.get(note_id)

        if not note:
            return jsonify({'error': 'Note not found'}), 404

        db.session.delete(note)
        db.session.commit()

        return jsonify({'message': 'Note deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy'}), 200


# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404


@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({'error': 'Internal server error'}), 500


# Create tables
with app.app_context():
    db.create_all()


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
