const readline = require('readline');
const crypto = require('crypto');
const cipher_alg = 'aes-128-cbc';
const key = '747b30a094db0b81';
const iv = Buffer.from( [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // 16length
const decipher = crypto.createDecipheriv(cipher_alg, key, iv);
ask()
function ask(){
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('de > ', (answer) => {
    console.log(answer)
    decode(answer);
    rl.close();
    ask();
  });
}
function decode(text){
  const decipher = crypto.createDecipheriv(cipher_alg, key, iv);
  var decrypted = decipher.update(text, 'base64','utf-8');
  decrypted = decipher.final('utf-8');
  console.log(decrypted)
}