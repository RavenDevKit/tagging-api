var RpcClient = require('ravend-rpc');

var config = {
  protocol: process.env.RAVEN_RPC_PROTOCOL || 'http',
  user: process.env.RAVEN_RPC_USER || 'ravencoin',
  pass: process.env.RAVEN_RPC_PASSWORD || 'local321',
  host: process.env.RAVEN_RPC_HOST || '127.0.0.1',
  port: process.env.RAVEN_RPC_PORT || '18766',
};

var raven = new RpcClient(config);

module.exports = raven;
