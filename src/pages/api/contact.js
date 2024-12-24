import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      // Create a transporter for Gmail
      const transporter = nodemailer.createTransport({
        service: "gmail", // Use Gmail's built-in service
        auth: {
          user: process.env.NEXT_PUBLIC_EMAIL_USER, // Your Gmail email address from .env
          pass: process.env.NEXT_PUBLIC_EMAIL_PASS, // Your Gmail app password from .env
        },
      });

      // Configure the email options
      const mailOptions = {
        from: email, // Sender's email
        to: process.env.NEXT_PUBLIC_EMAIL_USER, // Receiver's email (can be the same as the sender)
        subject: "Regarding Properties",
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res
        .status(500)
        .json({ message: "Failed to send the email. Please try again later." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
