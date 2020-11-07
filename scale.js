// Get value from CLI, this sohuld be replaced in browser
const a = parseInt(process.argv[2]); // max cont. authors per pad
const l = parseInt(process.argv[3]); // max cont. lurkers per pad
const p = parseInt(process.argv[4]); // max active pads

// Roughly how many characters we can expect a user will write
// Ref load testing tool for numbers
const charsPerSecond = 4;

// how many messages are used to accept first commit
// This is as user will send a message and server will respond with accept
const acceptCommit = 2;

// CPU cores, not CPUs themselves
let cores = 1;

// Etherpad by default uses up to 4Gb but 1Gb will suffice for a single core usually
let ramPerCore = 4096;

// Roughl how many msgs can Etherpad handle a second
const msgPool = 10000;

// A figure that allows us to increment the number of cores once usage gets above a threshold
let coreUsage = 0;

// Total Authors
let totalAuthors = 0;

// Total Lurkers
let totalLurkers = 0;

let i = 1;
// for each pad
while (i <= p){
  totalAuthors = totalAuthors + a;
  totalLurkers = totalLurkers + l;
  // Do the math.  This is basically an exponential function and there are
  // probably much cleaner ways to write it but this is fine for our user case
  let authormsgs = charsPerSecond * ((acceptCommit * a) + ((a - 1) * a));

  // lurkers never influence the amount of authormsgs but they do affect
  // how much broadcasting the server has to do
  let lurkermsgs = charsPerSecond * a * l;

  // add them up and we have our magic number :)
  let broadcasted = authormsgs + lurkermsgs;

  // we can add this pad to the current core
  coreUsage = coreUsage + broadcasted;

  // TODO: Lurkers don't really add much to CPU 

  if( (coreUsage >= msgPool) && (coreUsage > ( msgPool / 2) )){
    cores++;
    coreUsage = 0;
  }
  i++;
}

console.log("Required Cores: "+cores);
console.log("Required RAM per core: "+ramPerCore);
console.log("Total Authors: "+totalAuthors);
console.log("Total Lurkers: "+totalLurkers);
