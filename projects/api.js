require('dotenv').config();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const express = require('express');

const app = express();
const main = express();

const port = 3001;

const cors = require('cors');

app2.use(cors({ origin: true }));

main.use('/api/v1', app);
main.use(express.json());

app.post('/launchContact', (req, res) => {
    const { name, email, packageName, steemHandle, discordHandle, telegramHandle, skypeHandle, phone, otherComments, preferredCommunication } = req.body;

    const message = {
        to: process.env.AGGROED_EMAIL,
        cc: process.env.MATT_EMAIL,
        from: email,
        subject: `Steem Engine Launch Enquiry: ${packageName}`,
        html: `
            <p><strong>Package interested in:</strong> ${packageName}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Steem username:</strong> ${steemHandle}</p>
            <p><strong>Discord username:</strong> ${discordHandle}</p>
            <p><strong>Telegram username:</strong> ${telegramHandle}</p>
            <p><strong>Skype username:</strong> ${skypeHandle}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Other comments/notes</strong></p>
            <p>${otherComments}</p>
            <p><strong>Preferred method of communication:</strong> ${preferredCommunication}</p>
        `
    };

    sgMail.send(message);
});

main.listen(port, () => console.log(`Steem Engine Server running on port ${port}`));
