# Deploy to Vercel - Step by Step Guide

## 🚀 Your Website Will Be Live in 5 Minutes!

Follow these steps to deploy your e2People website to Vercel. Your MD will see instant updates whenever you make changes.

---

## **STEP 1: Create GitHub Account** (if you don't have one)

1. Go to [github.com](https://github.com)
2. Click "Sign up"
3. Enter email, create password, choose username
4. Verify email
5. Done! ✅

---

## **STEP 2: Create a New GitHub Repository**

1. Log in to GitHub
2. Click "+" icon (top right) → "New repository"
3. Fill in:
   - **Repository name**: `e2people-website`
   - **Description**: `Landing website for e2People Limited`
   - **Public** (so Vercel can access it)
4. Click "Create repository"
5. You'll see a page with commands - **COPY these commands**

---

## **STEP 3: Push Code to GitHub**

Run these commands in PowerShell (from your project folder):

```bash
cd "D:\Official Assignements\Website Design\e2People\e2people-website"

# Replace YOURUSERNAME with your GitHub username
git remote add origin https://github.com/YOURUSERNAME/e2people-website.git
git branch -M main
git push -u origin main
```

**Example** (with real username):
```bash
git remote add origin https://github.com/johndoe/e2people-website.git
git branch -M main
git push -u origin main
```

It will ask for your GitHub username and password (or token).

---

## **STEP 4: Connect Vercel & Deploy**

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign up" (or "Sign in" if you have account)
3. Choose "Continue with GitHub"
4. Authorize Vercel to access GitHub
5. Click "Import Project"
6. Select your `e2people-website` repository
7. Click "Import"
8. Vercel will auto-detect your settings (should be fine)
9. Click "Deploy"
10. Wait 30 seconds... ✅ **Your site is live!**

---

## **STEP 5: Get Your Live URL**

After deployment completes:
1. You'll see a "Production" badge
2. Click the URL - it looks like: `https://e2people-website.vercel.app`
3. **Share this URL with your MD** 👇

```
https://e2people-website.vercel.app
```

---

## **How Updates Work (Automatic!) 🎯**

### **You (Developer):**
1. Make changes locally
2. Test with `npm run dev`
3. Run:
```bash
git add .
git commit -m "Updated team photos and product info"
git push
```

### **Automatic Magic Happens:**
- GitHub gets your changes ✅
- Vercel detects the push ✅
- Vercel rebuilds your site ✅
- Website updates automatically ✅

### **Your MD:**
- Refreshes the Vercel link
- Sees your updates instantly! 🚀

---

## **Full Workflow Example**

### **Day 1: Initial Setup (Now)**
```bash
# You already did this:
git init
git add .
git commit -m "Initial setup"

# Now do this:
git remote add origin https://github.com/YOURUSERNAME/e2people-website.git
git branch -M main
git push -u origin main
```

Then deploy on Vercel (see Step 4 above).

### **Day 2: Update Team Bios**
```bash
# 1. Edit src/components/Team.jsx
# 2. Test locally: npm run dev
# 3. Commit & push:

git add src/components/Team.jsx
git commit -m "Updated team bios with new descriptions"
git push

# Vercel auto-deploys - MD sees it in 1 minute!
```

### **Day 3: Add New Service**
```bash
# 1. Edit src/components/Services.jsx
# 2. Test locally: npm run dev
# 3. Commit & push:

git add src/components/Services.jsx
git commit -m "Added new consulting service"
git push

# Auto-deployed! ✅
```

---

## **Commands You'll Use**

```bash
# See what changed
git status

# Stage your changes
git add .

# Commit with message
git commit -m "Your change description"

# Push to GitHub (auto-deploys to Vercel)
git push

# Check your live site
# Visit: https://YOUR-PROJECT.vercel.app
```

---

## **Troubleshooting**

### **Push fails with "authentication"?**
- GitHub now uses tokens instead of passwords
- Go to GitHub → Settings → Developer settings → Personal access tokens
- Create a token with "repo" permission
- Use token as password when pushing

### **Vercel build fails?**
- Check build logs on Vercel dashboard
- Usually it's a missing dependency
- Contact us if stuck!

### **Want custom domain?**
- On Vercel dashboard, go to "Settings" → "Domains"
- Add your domain (e.g., `e2people.com`)
- Follow DNS instructions
- Your site: `https://e2people.com` 🎉

---

## **What Your MD Sees**

**Your MD's Experience:**
1. You send link: `https://e2people-website.vercel.app`
2. MD opens it in browser
3. When you update and push:
   - MD refreshes page (after 1 minute)
   - Sees latest version
   - No complex setup needed!

**Your MD can see:**
- ✅ All sections (Hero, About, Services, Products, Team)
- ✅ All images and logos
- ✅ Contact form (test it)
- ✅ Mobile & desktop versions
- ✅ All animations and interactions

---

## **Pro Tips** 💡

1. **Write good commit messages**
   - ❌ "update"
   - ✅ "Updated team bios and fixed image display"

2. **Commit often**
   - After each major change
   - Makes it easy to undo if needed

3. **Test before pushing**
   - `npm run dev` locally
   - Make sure everything works
   - Then push

4. **Share live link**
   - Send MD: `https://your-project.vercel.app`
   - It auto-updates when you push
   - No manual uploads needed!

---

## **Quick Checklist**

- [ ] GitHub account created
- [ ] GitHub repository created
- [ ] Code pushed to GitHub (`git push`)
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Site deployed (live!)
- [ ] Live URL copied
- [ ] MD received the link
- [ ] MD can see the website

---

## **You're Done! 🎉**

Your e2People website is now live and automatically updating with every change you make.

**Share this with your MD:**
```
Visit our website here: https://e2people-website.vercel.app
(Updates automatically when I make changes)
```

---

**Questions?** These commands will help:
```bash
git status           # Check what changed
git log             # See commit history
git remote -v       # Check remote connection
```

Happy coding! 🚀
