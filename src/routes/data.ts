/**
 * @file Defines all data related route patterns.
 * @author Sebastian Gadzinski
 */
import express from 'express';
import DataController from '../controllers/DataController';
import {
    hasRole,
    isAuthenticated
} from '../middleware/authenticationMiddleware';

const router = express.Router({});

router.get('/translations', isAuthenticated, DataController.translations);

router.post('/translate', isAuthenticated, DataController.translate);

export default router;
