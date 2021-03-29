const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicatedNote = notes.find(note =>  note.title == title);
    
    if (!duplicatedNote) {
        notes.push({
           title: title,
           body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));

    } else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
}

const saveNotes =  (notes) => {
   const dataJSON = JSON.stringify(notes);
   fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes =  () => {
   try {
       const dataBuffer = fs.readFileSync('notes.json');
       const dataJSON = dataBuffer.toString();
       return JSON.parse(dataJSON);
   } catch (e) {
       return [];
   }
}

const removeNote =  (title) => {
    const notes = loadNotes();

    const newNotes = notes.filter(note => note.title !== title);

    if(notes.length == newNotes.length) {
        console.log(chalk.red.inverse('Note not found!'));  
    } else {
        saveNotes(newNotes);
        console.log(chalk.green.inverse('Note removed!'));  
    }
    
}

const listNotes = () => {
    console.log(chalk.redBright('Your Notes: '));
    const notes = loadNotes();
    notes.forEach(note => console.log(note.title));
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);
    if (note) {
        console.log(chalk.green.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red('No note found!'));
    }
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};