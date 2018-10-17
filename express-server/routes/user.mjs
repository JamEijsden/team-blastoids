import express from 'express';
import User from '../models/userModel';

const userRoutes = express.Router();
userRoutes
  .get('/users', (req, res) => {
    res.json([
            {
              id: 1,
              name: "Jimmie",
              color: "0xFF0000"
            },
            {
              id: 1,
              name: "Stiffu",
              color: "0x0000FF"
            }
        ])
      })
    .get('/users/1', (req,res)=>{
      res.json(
            {
                id: 1,
                name: "Jimmie",
                color: "0xFF0000"
            }
        )
});
export default userRoutes;
