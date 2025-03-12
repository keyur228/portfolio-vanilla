# Keyur Kurani Portfolio Website (Vanilla Version)

This is a professional portfolio website for Keyur Kurani built with vanilla HTML, CSS, and JavaScript. 

## Features

- Responsive design that works on mobile, tablet, and desktop
- Smooth animations and transitions
- Interactive sections with a clean, modern UI
- Contact form with backend email notifications
- SEO friendly structure

## Project Structure

```
.
├── index.html            # Main HTML file
├── css/
│   └── styles.css        # CSS styles
├── js/
│   └── main.js           # JavaScript functionality
├── images/               # Image assets
├── data/                 # Data storage directory
├── server.js             # Express server for contact form
└── package.json          # Node.js dependencies
```

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. Clone the repository or download the project files

2. Install the dependencies:
```bash
cd vanilla
npm install
```

3. Create a `.env` file in the project root with the following variables:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

Note: If you're using Gmail, you need to generate an app password.

### Running the Project

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The website should now be running at `http://localhost:3000`

## Customization

- Update the content in `index.html` to personalize the portfolio
- Modify styles in `css/styles.css` to change the appearance
- Add custom functionality in `js/main.js`

## Backend Features

- Contact form submissions are stored in a JSON file at `data/contacts.json`
- Email notifications are sent to the specified email address
- Simple Express server handles form submissions and serves static files

## Credits

- Font Awesome for icons
- Intersection Observer API for scroll animations