const http = require('http');
const fs = require('fs');
const { exec, spawn } = require('child_process');

async function capture() {
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--window-size=1440,1100',
    '--disable-gpu',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const req = http.request({
    hostname: '127.0.0.1',
    port: 9222,
    path: '/json/new?http://localhost:3000/experiment',
    method: 'PUT'
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const target = JSON.parse(data);
      const wsUrl = target.webSocketDebuggerUrl;
      console.log('Target created:', target.id);

      const WebSocket = require('https').request; // or native WebSocket if node 20
      // In Node 20, globalThis.WebSocket is available natively!
      const ws = new globalThis.WebSocket(wsUrl);

      ws.onopen = () => {
        let id = 1;
        const send = (method, params = {}) => {
          ws.send(JSON.stringify({ id: id++, method, params }));
        };

        ws.onmessage = (msg) => {
          const res = JSON.parse(msg.data);
          if (res.id === 1) {
            // Page enabled
            send('Runtime.enable');
          } else if (res.id === 2) {
            // Wait 2s for render, then scroll to #villas
            setTimeout(() => {
              send('Runtime.evaluate', {
                expression: 'document.getElementById("villas")?.scrollIntoView({behavior: "instant"});'
              });
            }, 2000);
          } else if (res.id === 3) {
            // Wait 1s after scroll, then take screenshot
            setTimeout(() => {
              send('Page.captureScreenshot', { format: 'png' });
            }, 1000);
          } else if (res.id === 4) {
            const buf = Buffer.from(res.result.data, 'base64');
            fs.writeFileSync('/Users/mahaboobbasha/.gemini/antigravity/brain/2332b49e-31fd-493f-8f7f-558669bbad04/villas_cards_demo.png', buf);
            console.log('Saved villas_cards_demo.png, bytes:', buf.length);

            // Now scroll to contact
            setTimeout(() => {
              send('Runtime.evaluate', {
                expression: 'document.getElementById("contact")?.scrollIntoView({behavior: "instant"});'
              });
            }, 500);
          } else if (res.id === 5) {
            setTimeout(() => {
              send('Page.captureScreenshot', { format: 'png' });
            }, 1000);
          } else if (res.id === 6) {
            const buf = Buffer.from(res.result.data, 'base64');
            fs.writeFileSync('/Users/mahaboobbasha/.gemini/antigravity/brain/2332b49e-31fd-493f-8f7f-558669bbad04/contact_demo.png', buf);
            console.log('Saved contact_demo.png, bytes:', buf.length);
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

capture().catch(console.error);
