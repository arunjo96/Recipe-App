# 🍴 Recipe App

A dynamic recipe application built with **React.js**, **TailwindCSS**, and **Axios**.  
This app allows users to:


- 🔎 Search for recipes  
- 🥗 Filter recipes by category  
- 📄 View full recipe details (ingredients, instructions, YouTube link)  
- ❤️ Save favorite recipes (stored in LocalStorage for persistence)  

---

## 🚀 Features

- **Search Recipes**: Find recipes by name using the search bar.  
- **Category Filter**: Browse recipes based on categories (e.g., Dessert, Seafood, etc.).  
- **Recipe Details**: View ingredients, instructions, and a YouTube tutorial link.  
- **Favorites Page**: Add/Remove recipes to your favorites list.  
- **Persistent Storage**: Favorites are saved in LocalStorage, so they remain after reload.  

---

## 🛠️ Tech Stack

- **Frontend**: React.js (Hooks, React Router, useState, useEffect)  
- **Styling**: TailwindCSS  
- **Icons**: Font Awesome  
- **API**: [TheMealDB](https://www.themealdb.com/api.php)  
- **State Management**: Local state + custom hooks  

---

## 📂 Project Structure

        src/
    │── Components/
    │ ├── Header.jsx
    │ ├── MealsCard.jsx
    │ ├── MealsCardDetails.jsx
    │── Hooks/
    │ └── Favorite.js
    │── Pages/
    │ ├── Home.jsx
    │ ├── Favorites.jsx
    │── Services/
    │ └── ServiceAPI.js
    │── App.jsx
    │── index.js



## ⚙️ Installation & Setup

 Clone the repo
   ```bash
   git clone https://github.com/arunjo96/Recipe-App.git