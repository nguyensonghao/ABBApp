var blockchain = require('blockchain-node');
var bc = new blockchain({
    username: 'username',
    password: 'password'
});

bc.getInfo(function(err, info) {
	console.log(info);
});