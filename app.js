var restify = require('restify');
var builder = require('botbuilder');

require('dotenv').config();

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector();

// Listen for messages from users 
server.post('/api/messages', connector.listen());

var DialogLabels = {
	BankAccount: 'Bank Account',
	AccountBalance: 'Account Balance',
	Transactions: 'Transactions'
};

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, [
    function (session) {
        // prompt for search option
        builder.Prompts.choice(
            session,
            'Hello, how are you doing today?  Are you looking to open a bank account, check your account balance, or view previous transaction?',
            [DialogLabels.BankAccount, DialogLabels.AccountBalance, DialogLabels.Transactions],
            {
                maxRetries: 3,
                retryPrompt: 'Not a valid option'
            });
    },
    function (session, result) {
        if (!result.response) {
            // exhausted attemps and no selection, start over
            session.send('Ooops! Too many attemps :( But don\'t worry, I\'m handling that exception and you can try again!');
            return session.endDialog();
        }

        // on error, start over
        session.on('error', function (err) {
            session.send('Failed with message: %s', err.message);
            session.endDialog();
        });

        // continue on proper dialog
        var selection = result.response.entity;
        switch (selection) {
            case DialogLabels.BankAccount:
                return session.beginDialog('bankAccount');
            case DialogLabels.AccountBalance:
                return session.beginDialog('accountBalance');
            case DialogLabels.Transactions:
            	return session.beginDialog('transactions');
        }
    }
]);

bot.dialog('bankAccount', require('./bankAccount'));
bot.dialog('accountBalance', require('./accountBalance'));
bot.dialog('transactions', require('./transactions'))
    .triggerAction({
        matches: [/help/i, /support/i, /problem/i]
    });

// log any bot errors into the console
bot.on('error', function (e) {
    console.log('And error ocurred', e);
});
