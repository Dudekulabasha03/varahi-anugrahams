const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');

async function captureHome() {
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--window-size=1440,1100',
    '--disable-gpu',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const req = http.request({
    hostname: '127.0.0.1',
    port: 9223,
    path: '/json/new?http://localhost:3000/',
    method: 'PUT'
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const target = JSON.parse(data);
      const wsUrl = target.webSocketDebuggerUrl;

      const ws = new globalThis.WebSocket(wsUrl);

      ws.onopen = () => {
        let id = 1;
        const send = (method, params = {}) => {
          ws.send(JSON.stringify({ id: id++, method, params }));
        };

        ws.onmessage = (msg) => {
          const res = JSON.parse(msg.data);
          if (res.id === 1) {
            send('Runtime.enable');
          } else if (res.id === 2) {
            setTimeout(() => {
              send('Page.captureScreenshot', { format: 'png' });
            }, 2500);
          } else if (res.id === 3) {
            const buf = Buffer.from(res.result.data, 'base64');
            fs.writeFileSync('/Users/mahaboobbasha/.gemini/antigravity/brain/2332b49e-31fd-493f-8f7f-558669bbad04/main_hero_demo.png', buf);
            console.log('Saved main_hero_demo.png');

            setTimeout(() => {
              send('Runtime.evaluate', {
                expression: 'document.getElementById("gallery")?.scrollIntoView({behavior: "instant"});'
              });
            }, 500);
          } else if (res.id === 4) {
            setTimeout(() => {
              send('Page.captureScreenshot', { format: 'png' });
            }, 1000);
          } else if (res.id === 5) {
            const buf = Buffer.from(res.result.data, 'base64');
            fs.writeFileSync('/Users/mahaboobbasha/.gemini/antigravity/brain/2332b49e-31fd-493f-8f7f-558669bbad04/main_gallery_demo.png', buf);
            console.log('Saved main_gallery_demo.png');
            chrome.kill();
            process.exit(0);
          }
        };

        send('Page.enable');
      };
    });
  });
  req.end();
}

captureHome().catch(console.error);
