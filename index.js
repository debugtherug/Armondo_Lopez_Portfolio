import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import fetch from 'node-fetch';

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const jobs = [
  {
    title: "AI Consultant",
    company: "Outlier AI",
    duration: "January 2024 - Present",
    description: "I work with Outlier AI to develop and deploy AI solutions for various industries. I am responsible for processing and refining data, designing and implementing machine learning models, and ensuring the accuracy and reliability of the solutions.",
    skills: ["Machine Learning", "Data Processing", "AI Model Deployment", "Artificial Intelligence", "C++", "Python", "JavaScript", "HTML", "CSS", "SQL", "Git", "Agile Methodologies"]
  },
  {
    title: "Open Source Contributor (Bug Triaging)",
    company: "The Document Foundation",
    duration: "April 2024 - March 2024",
    description: "I contributed to the Document Foundation's open source projects by triaging and resolving issues. I gained a strong understanding of best debugging practices and collaborated with members of the LibreOffice community to resolve issues.",
    skills: ["Bug Triaging", "Git", "GitHub", "Agile", "Open Source", "LibreOffice", "LibreOffice Community", "Documentation"]
  },
  {
    title: "Instructional Coach",
    company: "Calculus Roundtable",
    duration: "April 2022 - Present",
    description: "I coach students in various STEM topics with a primary focus in computer science. I provide personalized instruction and support students in their learning journey.",
    skills: ["Teaching", "Mentorship", "Python", "Math", "Science", "High-Impact Tutoring", "Technical Support", "Information Technology", "Database Management", "Video Game Design", "Curriculum Development" ]
  },
  {
    title: "Career Prep Fellow",
    company: "Uber",
    duration: "March 2022 - August 2022",
    description: "I earned the opportunity to take part in the Career Prep Fellowship program at Uber. I worked with a team of experts to gain vital exposure to the software industry as well as network with other professionals in the field.",
    skills: ["Networking", "Industry Exposure", "Software Development", "SaaS", "Communications", "Leadership", "Career Planning", "Problem-Solving", "Teamwork"]
  }
];

// Fetch GitHub data
async function getGithubData() {
  try {
    const response = await fetch('https://api.github.com/users/debugtherug');
    const data = await response.json();
    // Extract only important data
    return {
      avatar_url: data.avatar_url,
      bio: data.bio,
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return { avatar_url: '', bio: 'Failed to fetch bio'};
  }
}

// Routes
app.get('/', (req, res) => {
  res.render('index', { "currentPage": 'home' });
});

app.get('/about', (req, res) => {
  res.render('about', { "currentPage": 'about' });
});

app.get('/projects', async (req, res) => {
  const githubData = await getGithubData();
  res.render('projects', { "currentPage": 'projects', githubData });
})

app.get('/w_history', (req, res) => {
  res.render('w_history', { "currentPage": 'w_history', jobs });
})

app.get('/contact', (req, res) => {
  res.render('contact', { "currentPage": 'contact' });
})


app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`New contact form submission: ${name}, ${email}, ${message}`);

  // Nodemailer transporter setup (using Gmail as an example)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dr.debugging@gmail.com',      // Replace with your email
      pass: 'dmfa mfts jugm bczi'          // Use an App Password, not your Gmail password
    }
  });

  // Email configuration
  const mailOptions = {
    from: email,                         // Sender's email (user who submitted the form)
    to: 'dr.debugging@gmail.com',          // Your email (where you want to receive messages)
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('An error occurred while sending the message.');
    } else {
      console.log('Email sent:', info.response);
      res.send(`<h1>Thank you for your message, ${name}!</h1><a href="/">Go back to the homepage</a>`);
    }
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
