const yargs = require('yargs');
const chalk = require('chalk');
const notes = require('./notes');

yargs.command({
    command: 'add',
    describe: 'Adding A note',
    builder: {
        title: {
          describe: 'Note title',
          demandOption: true,
          type: 'string'          
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Removing a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
});

yargs.command({
    command: 'list',
    describe: 'Listing notes',
    handler() {
        notes.listNotes()
    }
});

yargs.command({
    command: 'read',
    describe: 'Reading a note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
});

yargs.parse();

