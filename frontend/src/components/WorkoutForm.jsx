import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
	const { dispatch } = useWorkoutsContext();
	const [title, setTitle] = useState('');
	const [reps, setReps] = useState('');
	const [load, setLoad] = useState('');
	const [error, setError] = useState('');
	const [emptyFields, setEmptyFields] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const workout = { title, load, reps };

		const res = await fetch('api/workouts/add-workout', {
			method: 'POST',
			body: JSON.stringify(workout),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await res.json();

		if (!res.ok) {
			setError(data.error);
			setEmptyFields(data.emptyFields)
		}

		if (res.ok) {
			setTitle('');
			setLoad('');
			setReps('');
			setError(null);
			setEmptyFields([])
			dispatch({ type: 'CREATE_WORKOUT', payload: data });
		}

	};

	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>Add a New Workout</h3>
			<label>Exercise Title:</label>
			<input
				type="text"
				onChange={(e) => setTitle(e.target.value)}
				value={title}
				className={emptyFields.includes('title') ? 'error' : ''}
			/>
			<label>Load (in kg)</label>
			<input
				type="number"
				onChange={(e) => setLoad(e.target.value)}
				value={load}
				className={emptyFields.includes('load') ? 'error' : '' }
			/>
			<label>Reps</label>
			<input
				type="number"
				onChange={(e) => setReps(e.target.value)}
				value={reps}
				className={emptyFields.includes('reps') ? 'error' : '' }
			/>
			<button>Add Exercise</button>
			{error && <div className="error">{emptyFields}</div>}
		</form>
	);
};

export default WorkoutForm;
