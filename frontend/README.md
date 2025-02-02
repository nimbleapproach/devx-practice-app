# Frontend

This is a Next.js application that provides a simple user interface with authentication and transaction management features.

## Features

- **Homepage**: The landing page for users.
- **Login**: A page for users to log into their accounts.
- **Sign Up**: A page for new users to create an account.
- **Contact Us**: A page for users to reach out for support or inquiries.
- **User Dashboard**: A dashboard accessible only to logged-in users, displaying user-specific information.
- **Add Transaction**: A page for logged-in users to add new transactions.

## Project Structure

```
nextjs-app
├── pages
│   ├── _app.js
│   ├── index.js
│   ├── login.js
│   ├── signup.js
│   ├── contact.js
│   ├── dashboard.js
│   └── add-transaction.js
├── components
│   ├── Navbar.js
├── styles
│   ├── globals.css
│   └── Home.module.css
├── public
│   └── ...
├── package.json
├── next.config.js
└── README.md
```

## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd nextjs-app
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000` to view the application.

## Usage

- Navigate through the application using the navigation bar.
- Use the login and sign-up pages to manage user accounts.
- Access the dashboard and add transactions once logged in.
