import express from 'express';

import { currentUser } from '@tkt2025/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
    // at this point, the `currentUser` custom middleware has set `currentUser` property on `req`
    res.send({ currentUser: req.currentUser || null });

});

export { router as currentUserRouter };