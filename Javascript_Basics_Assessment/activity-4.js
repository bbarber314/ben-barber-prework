let studentNames = [`Alexa`,`Brent`,`Clarissa`];

//Input Loop
for(i=0;i<3;i++){
    let name = prompt(`Please input a name for student #${i+1}:`);
    studentNames.push(name);
}

//Console Writing Loop
for(i=0;i<studentNames.length;i++){
    console.log(studentNames[i]);
}