import whatsappWeb from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { generateReply } from './utils/promptHandler.js';
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const { Client, LocalAuth } = whatsappWeb;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    }
});
// Generate QR Code for WhatsApp Login
client.on('qr', (qr) => {
    console.log('Scan this QR code to log in:');
    qrcode.generate(qr, { small: true });
});

// WhatsApp Ready Event
client.on('ready', () => {
    console.log('WhatsApp bot is ready!');
});

// Message Handler
client.on('message', async (message) => {
    console.log(`Message from ${message.from}: ${message.body}`);

    if (!message.from.endsWith('@g.us')) {
        try {
            const response = (await generateReply(message.body, message.from)).trim();
            await client.sendMessage(message.from, response);
        } catch (error) {
            console.error('Error:', error.message);
            await client.sendMessage(message.from, "Sorry, I encountered an error. Please try again later.");
        }
    }
});
// Start the client
client.initialize();


