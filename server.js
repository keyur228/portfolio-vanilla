const express = require('express');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Data directory
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Database file (simple JSON file for this demo)
const dbFile = path.join(dataDir, 'contacts.json');
if (!fs.existsSync(dbFile)) {
  fs.writeFileSync(dbFile, JSON.stringify([]));
}

// Email configuration
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASSWORD;

let transporter = null;
if (emailUser && emailPass) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });
}

// API routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill all fields' 
      });
    }
    
    const contact = {
      id: Date.now(),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString()
    };
    
    // Save to database
    const contacts = JSON.parse(fs.readFileSync(dbFile));
    contacts.push(contact);
    fs.writeFileSync(dbFile, JSON.stringify(contacts, null, 2));
    
    // Send email notification
    if (transporter) {
      await sendEmail(contact);
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });
  } catch (error) {
    console.error('Error handling contact form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

// Email sending function
async function sendEmail(contact) {
  try {
    const { name, email, subject, message } = contact;
    
    const mailOptions = {
      from: emailUser,
      to: 'keyurkurani5@gmail.com',  // Your email
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Message from Portfolio Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log('Email notification sent');
  } catch (error) {
    console.error('Failed to send email notification:', error);
  }
}

// Serve the HTML file for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});