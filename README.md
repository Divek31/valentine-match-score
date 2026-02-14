❤️ Valentine Match Score (The "Sassy" Edition)
A high-stakes Valentine's Day web app that combines a Love Compatibility Calculator with a classic "No" Button Prank. It’s designed to be sweet, slightly toxic, and highly interactive.

✨ Features
Sassy Love Calculator: Uses custom logic to determine if you're a "Match Made in Heaven" or "Not Worthy."

The "No" Button Prank: An elusive "No" button that dodges the cursor, making "Yes" the only option.

Live Data Logging: Every name entry and match result is logged in real-time to a Google Sheet via SheetDB.

Personalized Experience: Supports URL parameters (e.g., ?name=Riya) to greet the user personally.

Dynamic Music & Animations: Background music triggers on success, with floating hearts and romantic quotes.

🧠 The "Secret" Logic
To keep the game interesting, I built in some specific triggers:

The Elite Tier (95%-99%): Triggered if names contain the letters i, v, k or y, a, i.

The Roast Zone (<40%): If the random score is too low, the app alerts the user: "Tu mere layak nhi! 🙄".

🚀 Tech Stack
Frontend: React.js, Vite, Tailwind CSS

Deployment: Vercel

Database: Google Sheets + SheetDB API

🛠️ Installation
Clone the repo: git clone https://github.com/your-username/valentine-match-score.git

Install dependencies: npm install

Run locally: npm run dev
