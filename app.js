const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 8080; // Port on which the proxy server will listen

const requestHandler = (clientReq, clientRes) => {
  const options = {
    hostname: 'cdn.premarket.ly', // Destination hostname
    port: 443, // HTTPS port
    path: clientReq.url,
    method: clientReq.method,
    headers: clientReq.headers
  };

  const proxyReq = https.request(options, (proxyRes) => {
    clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(clientRes, {
      end: true
    });
  });

  clientReq.pipe(proxyReq, {
    end: true
  });

  proxyReq.on('error', (err) => {
    console.error('Proxy request error:', err);
    clientRes.statusCode = 500;
    clientRes.end('Proxy request failed');
  });
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
