const readline = require('readline');
const crypto = require('crypto');
const cipher_alg = 'aes-128-cbc';
const key = '747b30a094db0b81';
const iv = Buffer.from( [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // 16length
const cipher = crypto.createCipheriv(cipher_alg, key, iv);
 
ask()
 
function ask(){
 
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
 
  rl.question('en > ', (answer) => {
    // TODO: Log the answer in a database
    decode(answer);
    rl.close();
    ask();
  });
}
 
function decode(text){
  const cipher = crypto.createCipheriv(cipher_alg, key, iv);
  var encrypted = cipher.update(text, 'utf-8', 'base64');
  encrypted = cipher.final('base64');
  console.log(encrypted)
}