// Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// DOM Elements
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const message = document.getElementById('message');
const notesContainer = document.getElementById('notesContainer');

// Event Listeners
saveBtn.addEventListener('click', saveNote);
clearBtn.addEventListener('click', clearForm);

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
});

/**
 * Save a new note
 */
async function saveNote() {
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();

    // Validation
    if (!title) {
        showMessage('Please enter a note title', 'error');
        noteTitle.focus();
        return;
    }

    if (!content) {
        showMessage('Please enter note content', 'error');
        noteContent.focus();
        return;
    }

    // Disable button and show loading
    saveBtn.disabled = true;
    showMessage('Saving note...', 'loading');

    try {
        const response = await fetch(`${API_BASE_URL}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                content: content,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Success
        showMessage('Note saved successfully!', 'success');
        clearForm();
        loadNotes();
    } catch (error) {
        console.error('Error saving note:', error);
        showMessage('Failed to save note. Please try again.', 'error');
    } finally {
        saveBtn.disabled = false;
    }
}

/**
 * Load all notes from backend
 */
async function loadNotes() {
    notesContainer.innerHTML = '<p class="loading">Loading notes...</p>';

    try {
        const response = await fetch(`${API_BASE_URL}/notes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const notes = await response.json();

        // Clear container
        notesContainer.innerHTML = '';

        if (notes.length === 0) {
            notesContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📭</div>
                    <p>No notes yet. Create your first note!</p>
                </div>
            `;
            return;
        }

        // Display notes in reverse order (newest first)
        notes.reverse().forEach((note) => {
            const noteElement = createNoteElement(note);
            notesContainer.appendChild(noteElement);
        });
    } catch (error) {
        console.error('Error loading notes:', error);
        notesContainer.innerHTML = `
            <p class="loading" style="color: var(--error-color);">
                Failed to load notes. Please refresh the page.
            </p>
        `;
    }
}

/**
 * Create a note card element
 */
function createNoteElement(note) {
    const noteCard = document.createElement('div');
    noteCard.className = 'note-card';
    noteCard.dataset.noteId = note.id;

    const date = new Date(note.created_at);
    const formattedDate = date.toLocaleString();

    noteCard.innerHTML = `
        <div class="note-title">${escapeHtml(note.title)}</div>
        <div class="note-content">${escapeHtml(note.content)}</div>
        <div class="note-meta">
            <span class="note-date">${formattedDate}</span>
            <button class="btn btn-delete" onclick="deleteNote(${note.id})">Delete</button>
        </div>
    `;

    return noteCard;
}

/**
 * Delete a note
 */
async function deleteNote(noteId) {
    if (!confirm('Are you sure you want to delete this note?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        showMessage('Note deleted successfully', 'success');
        loadNotes();
    } catch (error) {
        console.error('Error deleting note:', error);
        showMessage('Failed to delete note', 'error');
    }
}

/**
 * Clear the form
 */
function clearForm() {
    noteTitle.value = '';
    noteContent.value = '';
    noteTitle.focus();
}

/**
 * Show message to user
 */
function showMessage(text, type) {
    message.textContent = text;
    message.className = `message show ${type}`;

    // Auto-hide after 5 seconds if it's a success message
    if (type === 'success') {
        setTimeout(() => {
            message.classList.remove('show');
        }, 5000);
    }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
