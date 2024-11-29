const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: 'auth'
    })
});


client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

const userState = new Map();

client.on('message_create', async message => {

    console.log(message.body);
    const telefone = await message.getContact().number;
    console.log(telefone);

    if (telefone == "556796358001") {
        console.log(userState.get(telefone));
        if (!userState.has(telefone)) {
            userState.set(telefone, 1)
            console.log(userState.get(telefone));
        }
        const currentStep = userState.get(telefone);
        if (currentStep === 1) {
            message.reply("Olá... Escolha..")
            userState.set(telefone, 2)
            console.log(userState.get(telefone));
        } else if (currentStep === 2) {
            if (message.body === "1") {
                console.log("CAIU AQUI!");
                message.reply("Você escolheu 1")
            } else if (message.body === "2") {
                message.reply("Você escolheu 2")
            }

        }
    }
});

/*client.on('message_create', message => {
    console.log(message.body);
});

client.on('message_create', message => {
    if (message.body === '!ping') {
        // send back "pong" to the chat the message was sent in
        client.sendMessage(message.from, 'pong');
    }
});*/
/*client.on('message_create', async message => {
    if (message.body === '!roda') {
        client.sendMessage(message.from, 'bla bla bla bom dia/tarde/noite vc quer qual lingua? 1 ou 2');
        if (message.body === '1') {
            client.sendMessage(message.from, 'sobre o que você quer saber? 1 2 3 4')
            if (message.body === '1') {
                client.sendMessage(message.from, 'sobre direitos humanos: 1 2 3')
                if (message.body === '1') {
                    client.sendMessage(message.from, 'quais são os direitos humanos - texto')
                }

                if (message.body === '2') {
                    client.sendMessage(message.from, 'como são protegidos - texto')
                }

                if (message.body === '3') {
                    client.sendMessage(message.from, 'o que eu posso fazer em caso de violação? - texto')
                }
            }
            if (message.body === '2') {
                client.sendMessage(message.from, 'sobre casos emblemáticos: 1 2 3 4')
                if (message.body === '1') {
                    client.sendMessage(message.from, 'caso Herzogo - texto')
                }

                if (message.body === '2') {
                    client.sendMessage(message.from, 'Caso maria da penha - texto')
                }

                if (message.body === '3') {
                    client.sendMessage(message.from, 'Caso lund - texto')
                }

                if (message.body === '4') {
                    client.sendMessage(message.from, 'Mais um caso? - texto')
                }
            }
        }
        if (message.body === '2') {
            client.sendMessage(message.from, 'sobre o que você quer saber? 1 2 3 4 (mas em inglês)')
        }
    }
});*/

client.initialize();