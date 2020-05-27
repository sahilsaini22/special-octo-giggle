const express = require('express');
const Router = express.Router();
const User = require('../../models/User');

//
//import { Router } from 'express';
// User Model
//import User from '../../models/User';

//const router = Router();
const router = Router;

/**
 * @route   GET api/users
 * @desc    Get all users
 * @access  Private
 */

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error('No users exist');
    res.json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
//export default router;;
