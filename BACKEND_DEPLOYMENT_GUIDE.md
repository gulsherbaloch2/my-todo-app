# Backend Deployment Guide

## Deploying Your FastAPI Backend

Your frontend (Next.js on Vercel) needs to communicate with your backend (FastAPI), but Vercel doesn't host Python applications. You need to deploy your backend separately.

## Option 1: Deploy to Render.com

1. Create an account at https://render.com
2. Create a new Web Service
3. Connect to your GitHub repository
4. Set runtime to Python
5. Set build command: `pip install -r requirements.txt`
6. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
7. Add environment variables as needed (DATABASE_URL, etc.)

## Option 2: Deploy to Railway

1. Create an account at https://railway.app
2. Create a new project
3. Connect to your GitHub repository
4. Select the Python template
5. Deploy

## Option 3: Deploy to PythonAnywhere

1. Create an account at https://www.pythonanywhere.com
2. Create a new web application
3. Choose manual configuration with Python 3.x
4. Upload your code and configure the WSGI file

## After Deploying Your Backend

1. Once your backend is deployed, you'll get a URL like:
   `https://your-app.onrender.com` or similar
   
2. Update your frontend's `NEXT_PUBLIC_API_BASE_URL` to this URL:
   `https://your-app.onrender.com/api`

3. Redeploy your frontend on Vercel with the updated environment variable

## Important Notes

- Make sure your backend allows CORS from your Vercel frontend URL
- Update the CORS settings in your FastAPI app:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://p2-gky1yzkpt-gulsher-s-projects.vercel.app"],  # Your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

- Ensure your backend is properly configured to work with your Supabase database in production