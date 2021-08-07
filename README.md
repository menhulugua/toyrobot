# toy robot

Run `npm run go` to start the program, add **log** as parameter to show warning messages, e.g. `npm run go log`\
Run `npm start` during development to see live update of program\
Run `npm test` to do unit test\
The program will keep running by taking user input\
Press `esc` button to quit\
The program takes one command as input each time, but you can copy and paste several commands to run them at once, such as
```
PLACE 1,2,EAST 
MOVE 
MOVE 
LEFT 
MOVE 
REPORT
```
Input commands are case insensative
Extra space in command like `PLACE 1,1,NORTH` will be taken as invalid command, threre's only 1 space between **PLACE** and the following, no space before or after comma