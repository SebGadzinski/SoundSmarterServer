/**
 * @file Defines all data related route patterns.
 * @author Sebastian Gadzinski
 */
import express from 'express';
import AdminController from '../controllers/AdminController';
import {
    hasRole,
    isAuthenticated
} from '../middleware/authenticationMiddleware';

const router = express.Router({});

router.get(
    '/users',
    isAuthenticated,
    hasRole('admin'),
    AdminController.getUserPageData
);

export default router;
