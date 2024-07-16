const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');
const db = require('../config/sql');

router.post('/entry', async (req, res) => {
    console.log(req.body);
    const { bankKey, bankAccNo, glDesc, glCode } = req.body;

    try {
        // Check in MongoDB
        let entry = await Entry.findOne({ bankKey, bankAccNo });

        if (entry) {
            return res.status(200).json({ glDesc: entry.glDesc, glCode: entry.glCode });
        } else {
            // If not found, add to MongoDB
            entry = new Entry({ bankKey, bankAccNo, glDesc, glCode });
            await entry.save();
        }

        // Check in MySQL
        db.query(
            'SELECT * FROM entries WHERE bankKey = ? AND bankAccNo = ?',
            [bankKey, bankAccNo],
            (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                } else if (result.length > 0) {
                    return res.status(200).json({ glDesc: result[0].glDesc, glCode: result[0].glCode });
                } else {
                    // Insert into MySQL
                    db.query(
                        'INSERT INTO entries (bankKey, bankAccNo, glDesc, glCode) VALUES (?, ?, ?, ?)',
                        [bankKey, bankAccNo, glDesc, glCode],
                        (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            } else {
                                return res.status(200).json({ message: 'Entry added successfully' });
                            }
                        }
                    );
                }
            }
        );
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
