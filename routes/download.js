const router = require('express').Router();
const File = require('../models/file');
const path = require('path');
const fs = require('fs');

router.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid });
        if (!file) {
            return res.render('download', { error: 'Link has been expired.' });
        }

        const filePath = path.join(__dirname, '../', file.path);
        
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return res.render('download', { error: 'File not found.' });
        }

        res.download(filePath, file.filename);
    } catch (error) {
        return res.render('download', { error: 'Something went wrong.' });
    }
});


module.exports = router;