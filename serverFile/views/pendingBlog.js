import  express from 'express';

const routerpendingblog = express.Router();

import Op from 'sequelize'

import { newpendingblogModel } from '../postgres/pendingBlog.js';

routerpendingblog.post('/add-blog-pending', async (req, res) => {

    try {
      const { postId,title,content } = req.body;
      const newBlog = await  newpendingblogModel.create({ postId,title,content});
      res.status(201).json(newBlog);
    } catch (error) {
      console.error('Error creating blog:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  routerpendingblog.get('/get-blogs-pending',async(req,res)=>
  {
    try {
            const posts = await  newpendingblogModel.findAll({
            order: [['postId', 'DESC']] // Order by createdAt column in descending order........
    });
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
})
routerpendingblog.delete('/pendingblog/:postId', async (req, res) => {
    try {
      const deleted = await newpendingblogModel.destroy({ where: { postId: req.params.postId } });
      if (deleted) {
        return res.status(204).send();
      }
      return res.status(404).json({ error: 'pending Blog not found' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  routerpendingblog.get('/pendingblog/:postId', async (req, res) => {
    const { postId } = req.params;
  
    try {
      // Find the user by username
      const user = await newpendingblogModel.findOne({ where: {postId} });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Find all blogs authored by the user
      const blogs = await newpendingblogModel.findAll({ where: { postId: user.postId} });
      if (blogs.length === 0) {
        return res.status(404).json({ error: 'No blogs found for this user' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
// // Search posts by title
// routerpendingblog.get('/search/posts/', async (req, res) => {
//     const { q } = req.query;
//     try {
//       const posts = await  newpendingblogModel.findAll({
//         where: {
//           username: {
//             [Op.iLike]: `%${q}%` // Case-insensitive search
//           }
//         }
//       });

//       res.json(posts);
//     } catch (error) {
//       console.error('Error searching posts:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

export default  routerpendingblog ;