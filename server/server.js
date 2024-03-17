const express = require('express');
const swaggerRoutes = require('./swagger');
const app = express();
const cors = require('cors'); 
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(swaggerRoutes);

let users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com'
    },
    {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com'
    }
];

console.log(users);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       '200':
 *         description: A list of users.
 *   post:
 *     summary: Create a new user
 *     description: Create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Created
 * 
 */

// GET /api/users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// POST /api/users
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: User not found
 */

// GET /api/users/:id
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Convert to number
    const user = users.find(user => user.id === userId);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
    } else {
        res.json(user);
    }
});


/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: integer
 *       - in: body
 *         name: user
 *         description: User object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: User not found
 */

// PUT /api/users/:id
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Convert to number
    const updatedUser = req.body;
    const index = users.findIndex(user => user.id === userId);
    if (index === -1) {
        res.status(404).json({ error: 'User not found' });
    } else {
        users[index] = { ...users[index], ...updatedUser }; 
        res.json(users[index]);
    }
});


/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */

// DELETE /api/users/:id
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Convert to number
    const index = users.findIndex(user => user.id === userId);
    if (index === -1) {
        res.status(404).json({ error: 'User not found' });
    } else {
        users.splice(index, 1); // Remove user from array
        res.status(204).end();
    }
});


const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Function to gracefully shut down the server
const closeServer = () => {
    server.close();
};

module.exports = { app, closeServer };