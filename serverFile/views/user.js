import  express from 'express';

import jwt from 'jsonwebtoken';

const routeruser = express.Router();

const JWT_SECRET = 'your-secret-key';

import bcrypt from 'bcrypt';

import { newuserModel } from '../postgres/user.js';

routeruser.post('/signup', async (req, res) => {
    try {
      const { username, email,password ,role} = req.body;
      const newUser = await newuserModel.create({ username, email,password,role});
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  routeruser.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await newuserModel.findOne({ where: { email } });

        // If user not found, return 404 error
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If password is invalid, return 401 error
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET, // Use environment variable for JWT secret
            { expiresIn: '1h' } // Token expiration time (e.g., 1 hour)
        );

        // Set JWT token as a cookie in the response
        res.cookie('token', token, {
          httpOnly: true, // Cookie accessible only via HTTP (not JavaScript)
          secure: true,   // Cookie sent over HTTPS only
          sameSite: 'none' // Cross-site requests allowed
      });
      
        // Return success response with token and user info
        res.status(200).json({
            message: 'Login successful',
            token,
            email:user.email,
            username:user.username,
            role:user.role,
            id:user,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
export default routeruser;