# 🚀 Deployment Guide

Deploy your Notes App to the cloud for free or affordable hosting!

## Option 1: Deploy Backend to Render (Recommended - Free Tier)

### Step 1: Prepare Your Backend

Update `app.py` to handle production:

```python
if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
```

Create `Procfile` in your project root:
```
web: python app.py
```

Update `requirements.txt` to include production server:
```
Flask==2.3.3
Flask-CORS==4.0.0
Flask-SQLAlchemy==3.0.5
SQLAlchemy==2.0.21
python-dotenv==1.0.0
Werkzeug==2.3.7
gunicorn==21.2.0
```

### Step 2: Push to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 3: Deploy to Render

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your `saving-notes` repository
5. Configure:
   - **Name**: `saving-notes-api`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
6. Add environment variables:
   - `FLASK_ENV`: `production`
   - `DATABASE_URL`: `sqlite:///notes.db` (or PostgreSQL for better performance)
7. Click "Create Web Service"

✅ Your backend will be live at: `https://saving-notes-api.onrender.com`

---

## Option 2: Deploy Frontend to Vercel/Netlify (Free)

### Using Netlify:

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account and select `saving-notes`
4. Configure:
   - **Build command**: (leave empty)
   - **Publish directory**: `.` (root directory)
5. Before deploying, update `script.js`:

```javascript
// Update the API base URL
const API_BASE_URL = 'https://saving-notes-api.onrender.com'; // Your Render URL

// Then use it in your fetch calls
const response = await fetch(`${API_BASE_URL}/api/notes`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title, content })
});
```

6. Click "Deploy site"

✅ Your frontend will be live at: `https://saving-notes.netlify.app`

---

## Option 3: Full Stack Deployment on Railway (Easiest)

### Step 1: Prepare Project

1. Update `app.py`:
```python
import os
if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
```

2. Create `Procfile`:
```
web: gunicorn app:app
```

3. Update `requirements.txt` to include `gunicorn`

### Step 2: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Select your `saving-notes` repository
5. Railway automatically detects Python and deploys
6. Your backend URL will appear in the deployment info

### Step 3: Update Frontend

Update your `script.js`:
```javascript
const API_BASE_URL = 'https://your-railway-url.railway.app';
```

---

## Option 4: Deploy Everything to Heroku (Requires Credit Card)

⚠️ **Note**: Heroku free tier is being phased out. Paid dynos start at $5/month.

### Alternative: Use PythonAnywhere for Backend

1. Go to [pythonanywhere.com](https://pythonanywhere.com)
2. Create free account
3. Upload your `app.py` and `requirements.txt`
4. Configure as Flask app
5. Your backend URL: `https://yourusername.pythonanywhere.com`

---

## Quick Comparison Table

| Service | Backend | Frontend | Free Tier | Notes |
|---------|---------|----------|-----------|-------|
| **Render** | ✅ | ❌ | Yes (limited) | Best for backend |
| **Netlify** | ❌ | ✅ | Yes (unlimited) | Best for frontend |
| **Railway** | ✅ | ✅ | $5 credit | Full stack, easiest |
| **PythonAnywhere** | ✅ | ❌ | Yes (limited) | Simple Python hosting |
| **Vercel** | ❌ | ✅ | Yes (unlimited) | Great for frontend |
| **Heroku** | ✅ | ✅ | ❌ Paid | Traditional platform |

---

## Step-by-Step: Render + Netlify (Recommended Free Option)

### Backend on Render:

1. Go to [render.com](https://render.com)
2. New Web Service
3. Connect GitHub
4. Select repository
5. Set build command: `pip install -r requirements.txt`
6. Set start command: `gunicorn app:app`
7. Deploy
8. Copy your URL (e.g., `https://saving-notes-api.onrender.com`)

### Update script.js:

```javascript
const API_BASE_URL = 'https://saving-notes-api.onrender.com'; // Your Render URL
```

### Frontend on Netlify:

1. Go to [netlify.com](https://netlify.com)
2. Import site from GitHub
3. Select repository
4. Deploy
5. Your URL: `https://saving-notes.netlify.app`

---

## Environment Variables for Production

Create these in your hosting platform's dashboard:

```
FLASK_ENV=production
DATABASE_URL=sqlite:///notes.db
CORS_ORIGINS=https://saving-notes.netlify.app
```

---

## Testing Your Deployment

```bash
# Test backend health
curl https://your-backend-url/api/health

# Test frontend
Open https://your-frontend-url in browser

# Create a test note
curl -X POST https://your-backend-url/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Note","content":"Testing deployment"}'
```

---

## Troubleshooting Deployment

### Backend won't start
- Check logs on Render/Railway dashboard
- Ensure `gunicorn` is in `requirements.txt`
- Check `Procfile` syntax

### CORS errors
- Update CORS_ORIGINS in environment variables
- Ensure frontend URL is allowed

### Database connection errors
- For SQLite: works fine with Render/Railway
- For PostgreSQL: use the provided DATABASE_URL

### Frontend can't reach backend
- Check that backend URL in `script.js` is correct
- Verify backend is running (`/api/health` endpoint)
- Check CORS configuration

---

## Live Example URLs

After deployment, your app will be accessible at:

**Frontend**: `https://your-app.netlify.app`
**Backend API**: `https://your-app-api.onrender.com`

Share these links with others to let them use your Notes App! 🎉

---

## Next Steps

1. ✅ Choose your hosting option (Render + Netlify recommended)
2. ✅ Follow the deployment steps above
3. ✅ Test your live application
4. ✅ Share the frontend URL with others
5. ✅ Monitor logs in your hosting dashboard

**Your app is ready to go live!** 🚀
