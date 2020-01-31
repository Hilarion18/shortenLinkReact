
import express from 'express';
import { getLinks, createLink, deleteAll } from '../controllers/link'
const router = express.Router();

/* Link routing. */
router.get('/', getLinks);
router.post('/', createLink);
router.delete('/', deleteAll)

export default router
