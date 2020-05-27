const express = require('express');
const Router = express.Router();
const auth = require('../../middleware/auth');
const Task = require('../../models/Task');

//import { Router } from 'express';
//import auth from '../../middleware/auth';
// Item Model
//import Task from '../../models/Task';

//const router = Router();
const router = Router;

/**
 * @route   GET api/items
 * @desc    Get All Items
 * @access  Public
 */

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    if (!tasks) throw Error('No items');

    res.status(200).json(tasks);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/tasks
 * @desc    Create An Item
 * @access  Private
 */

router.post('/', async (req, res) => {
  const newTask= new Task({
    description: req.body.description,
    assigned: req.body.assigned,
    status: req.body.status
  });

  try {
    const task = await newTask.save();
    if (!task) throw Error('Something went wrong saving the item');

    res.status(200).json(task);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   DELETE api/items/:id
 * @desc    Delete A Item
 * @access  Private
 */

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) throw Error('No item found');

    const removed = await task.remove();
    if (!removed)
      throw Error('Something went wrong while trying to delete the task');

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});


module.exports = router
//export default router;
