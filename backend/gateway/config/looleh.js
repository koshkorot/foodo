const os = require('os');
const config = require('./index');

module.exports = {
  rmqTransportConfig: {
    rmq: {
      url: process.env.RABBIT_FORCE_URL || config.get('rabbit').url,
      auth: {
        username: config.get('rabbit').user,
        password: config.get('rabbit').password,
      },
    },
    merlin: {
      url: process.env.MERLIN_URL || 'http://localhost:3001',
      tags: {
        hostname: os.hostname(),
        instance: process.env.CLUSTER_NAME,
      },
    },
  },
  asyncHookContextConfig: {
    hook: { enable: true },
  },
  jaegerTracerConfig: {
    rate: 0.1,
    jaeger: {
      host: process.env.JAEGER_AGENT_HOST,
      port: 6832,
    },
  },
  consoleProfilerConfig: {
    rate: 0,
    tags: {
      hostname: os.hostname(),
      instance: process.env.CLUSTER_NAME,
    },
  },
  redisProfilerConfig: {
    rate: 0.1,
    tags: {
      hostname: os.hostname(),
      instance: process.env.CLUSTER_NAME,
    },
    redis: {
      single: null,
      cluster: [

      ],
    },
  },
};
