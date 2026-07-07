# 📦 Digital Time Capsule

A modern web application that allows users to create digital time capsules containing messages, notes, and images that remain locked until a selected future date and time. Once the unlock time is reached, users can open and revisit their stored memories.

## ✨ Features

* 📝 Create digital time capsules
* 📅 Schedule a future unlock date and time
* 🖼️ Upload and store images
* 🔒 Lock capsules until the selected date
* 🔓 Automatically unlock capsules when the countdown ends
* ⏳ Live countdown timer
* 🔍 Search capsules by title or message
* 📊 View statistics for total, locked, unlocked, and public capsules
* ✏️ Edit locked capsules
* 🗑️ Delete capsules
* 🌙 Dark mode support
* 💾 Local Storage for persistent data
* 📱 Fully responsive design

---

## 📸 Preview

The application provides a clean dashboard where users can:

* Create new capsules
* View countdown timers
* Track capsule status
* Open unlocked capsules in a modal
* Search and sort stored memories

---

## 🚀 Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* Local Storage API
* FileReader API
* Font Awesome
* Google Fonts (Inter)

---

## 📂 Project Structure

```text
Time-Capsule/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
```

---

## ⚙️ How It Works

1. Enter a title and message.
2. Select a future unlock date and time.
3. Upload an optional image.
4. Choose the capsule visibility (Private/Public).
5. Save the capsule.
6. The application stores the capsule in Local Storage.
7. A live countdown displays the remaining time until unlocking.
8. Once the unlock time is reached, the capsule becomes accessible.

---

## 📦 Stored Capsule Structure

```javascript
{
    id: 1723456789,
    title: "Letter to Future Me",
    message: "Never stop learning.",
    unlockDate: "2026-12-25T12:00",
    image: "Base64 Image",
    visibility: "private",
    createdAt: "2026-07-07T10:20:00"
}
```

---

## 📊 Statistics Dashboard

The application automatically displays:

* Total Capsules
* Locked Capsules
* Unlocked Capsules
* Public Capsules

---

## 🔍 Search & Sorting

### Search

Search capsules by:

* Title
* Message

### Sort Options

* Newest
* Oldest
* Unlock Date
* Locked First
* Unlocked First

---

## 🌙 Dark Mode

Users can switch between Light and Dark themes. The selected theme is saved using Local Storage and is automatically restored when the application is reopened.

---

## 💾 Local Storage

All capsules are stored locally in the browser using the Local Storage API. No external database or backend server is required.

---

## 👨‍💻 Author

Developed as a front-end web application to preserve memories and allow users to revisit them at a meaningful moment in the future.
