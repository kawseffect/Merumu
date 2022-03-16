import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';

const port = 9000;

createServer((req, res) => {
  let responseCode = 404;
  let content = '404 Error';

  if (req.url === '/') {
    responseCode = 200;
    content = readFileSync('./index.html', 'utf-8');
  }

  res.writeHead(responseCode, {
    'content-type': 'text/html;charset=utf-8'
  });

  res.write(content);
  res.end();
}).listen(port);
