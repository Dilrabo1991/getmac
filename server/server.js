// var macaddress = require('macaddress');

// macaddress.one((err, mac) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(mac);
//     }
// })

// macaddress.all(function (err, all) {
//     console.log(JSON.stringify(all, null, 2));
// });
// macaddress.all().then(function (all) {
//     console.log(JSON.stringify(all, null, 2));
// });
// console.log(JSON.stringify(macaddress.networkInterfaces(), null, 2));


// server.js

const express = require('express');
const cookieParser = require('cookie-parser');
const getmac = require('getmac');

const app = express();
const port = 3001;

app.use(cookieParser());

app.get('/login', (req, res) => {
    // Check if the user has a unique identifier (cookie)
    let userId = req.cookies.userId;

    if (!userId) {
        // If no identifier exists, generate a new one
        userId = generateUniqueId();
        res.cookie('userId', userId, { maxAge: 900000, httpOnly: true }); // Set a cookie that expires in 15 minutes
    }

    // Get the client's MAC address
    const clientMacAddress = getmac.default();

    // Log or store the client's MAC address on the server
    console.log(`User ${userId} logged in with MAC address: ${clientMacAddress}`);

    res.send(`User ${userId} logged in`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function generateUniqueId() {
    // Generate a simple unique identifier (for demonstration purposes)
    return Math.random().toString(36).substring(2, 15);
}
