const fs = require('fs');

const fetchNotes = () => {
	try {
		const notesString = fs.readFileSync('./notes.json');
		const notes = JSON.parse(notesString);
		return notes;
	} catch (error) {
		console.error(error);
		return [];
	}
};

const addNote = (title, body) => {
	var notes = fetchNotes();
	var note = {
		title,
		body
	};

	notes.push(note);
	fs.writeFileSync('notes.json', JSON.stringify(notes));

	return note;
};

const getAll = () => {
	return fetchNotes();
};

const getNote = (title) => {
	var notes = fetchNotes();
	var filteredNotes = notes.filter((note) => note.title === title);
	return filteredNotes[0];
};

const removeNote = (title) => {
	return title;
};

module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote
};