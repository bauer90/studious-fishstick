import express from 'express';

import { requireAuth } from './require-auth';
import { currentUser } from '../middlewares/current-user';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
    // at this point, the `currentUser` custom middleware has set `currentUser` property on `req`
    res.send({ currentUser: req.currentUser || null });

});

export { router as currentUserRouter };