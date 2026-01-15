const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');

const { v4: uuid4 } = require('uuid');

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/' ),
    filename: (req, file, cb) => {

        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
})


let upload = multer({
    storage,
    limits: { fileSize: 1000000 * 100 },
}).single('myfile');



router.post('/', (req, res) => {
    upload(req, res, async (err) => {
        //validate request
        if (err) {
            return res.status(500).send({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'All fields required.' });
        }

        // Store in DB
        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
        });

        try {
            const response = await file.save();
            const baseURL = process.env.APP_BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
            return res.json({ file: `${baseURL}/files/${response.uuid}` });
        } catch (error) {
            return res.status(500).send({ error: 'Error saving file to database.' });
        }
    });
});


router.post('/send', async (req, res) => {
    try {
        const { uuid, emailTo, emailFrom } = req.body;

        if (!uuid || !emailTo || !emailFrom) {
            return res.status(422).send({ error: 'All fields required.' });
        }

        //Get from DB
        const file = await File.findOne({ uuid: uuid });
        if (!file) {
            return res.status(404).send({ error: 'File not found.' });
        }

        if (file.sender && file.receiver) {
            return res.status(422).send({ error: 'Email already sent.' });
        }

        file.sender = emailFrom;
        file.receiver = emailTo;
        await file.save();

        //send email
        const sendMail = require('../services/emailService');
        const baseURL = process.env.APP_BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
        sendMail({
            from: emailFrom,
            to: emailTo,
            subject: 'storeNshare file sharing',
            text: `${emailFrom} shared a file with you.`,
            html: require('../services/emailTemplate')({
                emailFrom: emailFrom,
                downloadLink: `${baseURL}/files/${file.uuid}`,
                size: parseInt(file.size / 1000) + ' KB',
                expires: '24 hours',
                appBaseUrl: baseURL
            })
        });

        return res.send({ success: true });
    } catch (error) {
        return res.status(500).send({ error: 'Error sending email.' });
    }
});

module.exports = router;