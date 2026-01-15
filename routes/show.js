const router = require('express').Router();
const File = require('../models/file');

router.get('/:uuid', async (req, res) => {
    try{
        const file = await File.findOne({ uuid: req.params.uuid });

        if(!file){
            return res.render('download', { error: 'Link has been Expired.' });
        }
        const baseURL = process.env.APP_BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
        return res.render('download', {
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            downloadLink: `${baseURL}/files/download/${file.uuid}`
        })

    } catch(err) {
        return res.render('download', { error: 'Something went wrong.'});
    }


});



module.exports = router;