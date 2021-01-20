Transcripts merging

A nodeJs script to merge two transcripts into one mergedScript and manage timestamp overlap

---
## Requirements

For development, you will only need Node.js and a node global package, NPM, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

If the installation was successful, you should be able to run the following command.

    $ node --version
    v14.5.0

    $ npm --version
    6.14.5


## Install

    $ git clone https://github.com/YounesChellaf/test
    $ cd test
    $ npm install

## Configure app

Open `./index.js` then go to main() function, you can change the file path for testing the mergeTranscripts(transcript1,transcript2) function.
By default the test files are setted on 

    $ const file1 = parse(fs.readFileSync('./mocks/de_1-channel1.json','utf8'))
    $ const file2 = parse(fs.readFileSync('./mocks/de_1-channel2.json','utf8'))

- You can choose any two files from the test folder ./mocks;

## Running the project
To run the project 

    $ node index.js

## Running the test for mergeTranscript timestamp overlap

Open `./index.test.js`, you can change the file path for testing the timestamp overlap.
As an initial values, the test files are setted on:

    $ const file1 = parse(fs.readFileSync('./mocks/nl_1-channel1.json','utf8'))
    $ const file2 = parse(fs.readFileSync('./mocks/nl_1-channel2.json','utf8'))

- You can choose any two files from the test folder ./mocks;

Using the command below, you can test the timestamp overlap after merging two transcripts

    $ npm test
