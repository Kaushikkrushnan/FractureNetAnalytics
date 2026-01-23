# Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: Blank Screen or Website Not Loading

**Symptoms:**
- Blank screen when opening http://localhost:3000
- Page loads but shows nothing
- Browser console shows errors

**Solutions:**

#### A. Dependencies Not Installed
Run the installation commands:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
pip install -r requirements.txt
```

Or use the automated setup script:
```bash
chmod +x setup.sh
./setup.sh
```

#### B. Next.js Server Not Running
Make sure the Next.js development server is running:
```bash
npm run dev
```

You should see output like:
```
▲ Next.js 16.0.10
- Local:        http://localhost:3000
✓ Ready in 2.3s
```

If you see `command not found: next`, dependencies aren't installed. Run `npm install`.

---

### Issue 2: Error When Opening Website

**Symptoms:**
- Error message appears when loading the page
- "Failed to connect to prediction service"
- API errors in console

**Solutions:**

#### A. Flask Backend Not Running
The website requires BOTH services running:

**Terminal 1 - Flask Backend:**
```bash
cd backend
python app.py
```

You should see:
```
Model loaded successfully
Starting Flask server...
* Running on http://127.0.0.1:5000
```

**Terminal 2 - Next.js Frontend:**
```bash
npm run dev
```

#### B. Port Conflict
If port 5000 or 3000 is already in use:
```bash
# Check what's using the ports
lsof -i :5000
lsof -i :3000

# Kill the process or change ports
# For Flask, edit backend/app.py line with app.run(port=5000)
# For Next.js, use: npm run dev -- -p 3001
```

---

### Issue 3: Prediction Errors

**Symptoms:**
- "Failed to connect to prediction service"
- Predictions return errors
- No results appear after clicking "Predict Suitability"

**Solution:**
Ensure Flask backend is running (see Issue 2A above).

Check backend logs for errors:
```bash
cd backend
python app.py
```

Test the backend directly:
```bash
curl -X POST http://localhost:5000/health
```

Should return:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "scaler_loaded": true,
  "columns_loaded": true
}
```

---

### Issue 4: VS Code Shows Blank Screen

**Symptoms:**
- Opening in VS Code shows blank screen
- VS Code live server not working

**Solution:**
VS Code's live server doesn't work with Next.js applications. You MUST use the Next.js dev server:

```bash
# Don't use VS Code's "Open with Live Server"
# Instead, run in terminal:
npm run dev
```

Then open http://localhost:3000 in your browser.

---

### Issue 5: Module Not Found Errors

**Symptoms:**
- `Module not found: Can't resolve '@/components/dashboard'`
- `Cannot find module 'flask'`
- `No module named 'tensorflow'`

**Solutions:**

#### Frontend module errors:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Backend module errors:
```bash
cd backend
pip install -r requirements.txt --user
```

---

### Issue 6: TensorFlow Installation Issues

**Symptoms:**
- `ERROR: Could not find a version that satisfies the requirement tensorflow`
- TensorFlow installation fails

**Solution:**
Ensure you have Python 3.8-3.11 (TensorFlow 2.18 doesn't support 3.12+):
```bash
python --version

# If you have Python 3.12+, use a virtual environment with Python 3.11:
python3.11 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r backend/requirements.txt
```

---

## Quick Start Checklist

Follow these steps in order:

- [ ] 1. **Install Dependencies**
  ```bash
  npm install
  cd backend && pip install -r requirements.txt
  ```

- [ ] 2. **Start Flask Backend** (Terminal 1)
  ```bash
  cd backend
  python app.py
  ```
  Wait for "Starting Flask server..." message

- [ ] 3. **Start Next.js Frontend** (Terminal 2)
  ```bash
  npm run dev
  ```
  Wait for "Ready in..." message

- [ ] 4. **Open Browser**
  Navigate to http://localhost:3000

- [ ] 5. **Test Prediction**
  Enter values and click "Predict Suitability"

---

## System Requirements

### Minimum:
- Node.js 18+
- Python 3.8-3.11
- 4GB RAM
- 2GB free disk space

### Recommended:
- Node.js 20+
- Python 3.10
- 8GB RAM
- 5GB free disk space

---

## Getting Help

If you're still experiencing issues:

1. **Check the logs:**
   - Frontend: Look at the terminal running `npm run dev`
   - Backend: Look at the terminal running `python app.py`
   - Browser: Open Developer Tools (F12) and check the Console tab

2. **Test backend separately:**
   ```bash
   cd backend
   python app.py
   # In another terminal:
   curl http://localhost:5000/health
   ```

3. **Review documentation:**
   - INTEGRATION_GUIDE.md
   - TEST_CASES.md
   - README_SUMMARY.md

4. **Common error messages:**
   - "ECONNREFUSED 127.0.0.1:5000" → Flask backend not running
   - "Module not found" → Dependencies not installed
   - "command not found: next" → Run `npm install`
   - "No module named 'flask'" → Run `pip install -r backend/requirements.txt`

---

## Environment Variables (Optional)

Create a `.env.local` file in the root directory:
```env
FLASK_API_URL=http://localhost:5000
FLASK_ENV=development
```

This is optional - the system uses defaults if not set.

---

## Port Configuration

Default ports:
- Frontend: 3000
- Backend: 5000

To change ports:

**Frontend:**
```bash
npm run dev -- -p 3001
```

**Backend:**
Edit `backend/app.py`, line ~365:
```python
app.run(host='0.0.0.0', port=5001, debug=debug_mode)
```

And update `app/api/predict/route.ts`, line 3:
```typescript
const FLASK_API_URL = process.env.FLASK_API_URL || 'http://localhost:5001'
```
