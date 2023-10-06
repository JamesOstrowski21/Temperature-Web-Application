const db = require("../static/js/dbconnector.js");


exports.viewTable = async (req, res) => {
    const response = await db.query('SELECT * FROM users');
    res.status(200).send(response.rows);
};


// exports.deleteUser = async (req, res) => {
//     const { id } = req.body; // Assuming the user ID is sent in the request body

//     try {
//         // Execute a database query to delete the user with the specified ID
//         const queryResult = await db.query('DELETE FROM users WHERE id = $1', [id]);

//         // Check if any rows were affected (user was successfully deleted)
//         if (queryResult.rowCount === 1) {
//             res.sendStatus(204); // Send a "No Content" response for successful deletion
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
