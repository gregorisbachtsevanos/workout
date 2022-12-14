import mongoose from 'mongoose';
import Workout from '../models/workout_model.js';

// GET workout list
export const displayWorkoutList = async (req, res) => {
	const workout = await Workout.find().sort({ updatedAt: 'DESC' });
	res.status(200).json(workout);
};

// GET workout
export const displayWorkout = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id))
		throw res.status(404).json({ error: 'Workout not found' });
	const workout = await Workout.findById(id);
	if (!workout) throw res.status(404).json({ error: 'Workout not found' });
	res.status(200).json({ title: 'Workout', workout });
};

// GET||CREATE workout
export const createWorkout = (req, res) => {
	res.status(200).json({ title: 'Create Workout' });
};

export const createWorkoutLogic = async (req, res) => {
	const { title, reps, load } = req.body;
	let emptyFields = [];

	if (!title) emptyFields.push('title');
	if (!load) emptyFields.push('load');
	if (!reps) emptyFields.push('reps');
	if (emptyFields.length > 0)
		return res
			.status(400)
			.json({ error: 'Please fill in all fields', emptyFields });

	try {
		const workout = await Workout.create({ title, reps, load });
		res.status(200).json(workout);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

// UPDATE workout
export const updateWorkout = async (req, res) => {
	const { id } = req.params;
	console.log('Update Workout');
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).json({ error: 'Workout not found' });
	const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });
	if (!workout) return res.status(404).json({ error: 'Workout not found' });
	res.status(200).json({ title: 'Update workout', workout });
};

// DELETE workout
export const deleteWorkout = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).json({ error: 'Workout not found' });
	const workout = await Workout.findByIdAndDelete(id);
	if (!workout) return res.status(404).json({ error: 'Workout not found' });
	res.status(200).json({ title: 'Delete workout', workout });
};
