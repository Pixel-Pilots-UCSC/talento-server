const express = require('express');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const database = require('./database');
const config = require('./config');
const routes = require('./routes');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// connect to mongoDB
database.init(true); //  to run seeds database.init(true);

//connect to websocket


// express in json format and urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add compression
app.use(compression());

// cors
// app.use(
//     cors({
//         origin: [config.client_urls.app],
//         credentials: true
//     })
// );

app.use(cors());

// cookie parser
app.use(cookieParser());

// add a prefix for routes
app.use('/api', routes);



// listen to server at given port
// const httpServer = app.listen(config.port, () => console.info('server listening at port:', config.port));
server.listen(config.port, () => console.info('server listening at port:', config.port));
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://dinushan:dinushan4321@talentocluster0.ofsvtqu.mongodb.net/?retryWrites=true&w=majority&appName=talentoCluster0"
const client = new MongoClient(uri);

let changeStream;

async function run(socket) {

    try {

        const database = client.db("test");

        const jobs = database.collection("users");

        // Open a Change Stream on the "haikus" collection

        changeStream = jobs.watch();

        // Print change events as they occur
        let changes = []
        for await (const change of changeStream) {
            console.log(change);
                io.emit('chat', change)
        }

        // Close the change stream when done

        await changeStream.close();
        return changes;



    } finally {

        // Close the MongoDB client connection

        await client.close();

    }
}
io.on('connection', (socket) => {
    run(socket)

    socket.on('chat', message => {
        io.emit('chat', run())
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

