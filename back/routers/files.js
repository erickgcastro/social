const path = require('node:path');
const express = require('express');
const router = express.Router();

router.get('/:file', (req, res) => {
  const { file } = req.params;
  const fileDir = path.resolve(__dirname, '..', '..', 'infra', 'uploads', file);
  res.sendFile(fileDir, (err) => {
    if (err) {
      return res.status(404).json({
        message: 'File not found',
        statusCode: 404,
        details: 'File not found',
      });
    }
  });
});

module.exports = router;
