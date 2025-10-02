const jwt = require('jsonwebtoken');
require('dotenv').config();
const mutations = require('../models/mutations');
const userQueries = require('../models/userQueries');
const bcrypt = require('bcrypt');

async function login(req, res) {
    try{
        const { email, password } = req.body;
        const user = await userQueries.getUserByEmail(email);
        if(!user) return res.status(400).json({ message: 'User not found' });
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(400).json({ message: 'Invalid password' });

        const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.status(200).json( { accessToken, user: { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin } } );
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function register(req, res) {
    try{
        const { name, email, password } =req.body;
        const existingUser = await userQueries.getUserByEmail(email);
        if(existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
        await mutations.createUser({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { login, register };
