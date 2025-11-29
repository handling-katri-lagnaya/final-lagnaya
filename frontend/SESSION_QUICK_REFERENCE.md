# 🔐 Session Management - Quick Reference

## ⚡ Quick Facts

- **Session Duration:** 7 days
- **Check Interval:** Every 5 minutes
- **Auto-Logout on Home:** Yes
- **Activity Tracking:** Yes

---

## 🎯 Key Behaviors

### 1. **Home Page Auto-Logout**

```
Logged In User → Visits "/" → Auto Logout → Public Home Page
```

### 2. **Session Expiry**

```
Login → 7 Days Pass → Next Visit → "Session Expired" → Must Login Again
```

### 3. **Active Session**

```
Login → Use App Within 7 Days → Session Valid → No Logout
```

---

## 🧪 Quick Test

### **Test Auto-Logout on Home:**

1. Login: `priya.sharma@email.com` / `password123`
2. Go to Dashboard (should see authenticated navbar)
3. Click "Home" or logo
4. ✅ Should be logged out automatically
5. ✅ Should see public navbar

### **Test Session Persistence:**

1. Login
2. Close browser
3. Reopen browser
4. Go to `/dashboard`
5. ✅ Should still be logged in (if < 7 days)

---

## ⚙️ Configuration File

**Location:** `src/config/sessionConfig.js`

```javascript
EXPIRY_DAYS: 7,              // Change session duration
CHECK_INTERVAL_MINUTES: 5,   // Change check frequency
LOGOUT_ON_HOME_VISIT: true,  // Enable/disable home logout
```

---

## 📊 localStorage Keys

```javascript
currentUser; // User object
isAuthenticated; // "true" or removed
lastLoginTime; // Timestamp (milliseconds)
lastActivityTime; // Last user interaction
```

---

## 🔍 Debug Commands

**Check Session in Browser Console:**

```javascript
// Check login time
const loginTime = localStorage.getItem("lastLoginTime");
console.log("Login:", new Date(parseInt(loginTime)));

// Check days since login
const days = (Date.now() - parseInt(loginTime)) / (1000 * 60 * 60 * 24);
console.log("Days since login:", days);

// Check if expired
console.log("Expired?", days > 7);
```

---

## 🚀 Server Info

**URL:** `http://localhost:8080/`

**Test Accounts:**

- User: `priya.sharma@email.com` / `password123`
- Admin: `admin@khatrilagnaya.com` / `admin123`

---

## ✅ What's Working

- ✅ Auto-logout on home page visit
- ✅ Session expiry after 7 days
- ✅ Background session monitoring
- ✅ Activity tracking
- ✅ Session persistence across browser restarts
- ✅ Clear expiry messages
- ✅ Automatic cleanup

---

## 📝 Common Scenarios

| Scenario                                  | Result                 |
| ----------------------------------------- | ---------------------- |
| Login → Visit Home                        | Logout immediately     |
| Login → Close Browser → Reopen (< 7 days) | Still logged in        |
| Login → Wait 7+ days → Visit any page     | Logout with message    |
| Login → Active use → 5 min check          | Session valid          |
| Login → Inactive 7+ days → Return         | Logout on first action |

---

## 🎯 Next Steps

1. ✅ Test auto-logout on home page
2. ✅ Test session persistence
3. ✅ Verify expiry message
4. ✅ Check activity tracking
5. ✅ Customize settings if needed

---

**Everything is ready to test!** 🎉
