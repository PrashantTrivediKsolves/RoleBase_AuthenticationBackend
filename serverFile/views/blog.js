import  express from 'express';

const routerblog = express.Router();

import Op from 'sequelize'

import { newblogModel } from '../postgres/blog.js';

routerblog .post('/add-blog', async (req, res) => {

    try {
      const { postId,title,content } = req.body;
      const newBlog = await newblogModel.create({ postId,title,content});
      res.status(201).json(newBlog);
    } catch (error) {
      console.error('Error creating blog:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

routerblog.get('/get-blogs',async(req,res)=>
{
    try {
        const posts = await newblogModel.findAll({
            order: [['postId', 'DESC']] // Order by createdAt column in descending order
    });
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
})


// Search posts by title
routerblog.get('/search/posts/', async (req, res) => {
    const { q } = req.query;
    try {
      const posts = await newblogModel.findAll({
        where: {
          username: {
            [Op.iLike]: `%${q}%` // Case-insensitive search
          }
        }
      });
  
      res.json(posts);
    } catch (error) {
      console.error('Error searching posts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
 
export default routerblog ;