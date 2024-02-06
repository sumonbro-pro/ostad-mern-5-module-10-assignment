// 1.It should use the http module to create an HTTP server.
const http = require('http');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage: storage});

const server = http.createServer((req, res) => {
// 4.If you request this url “/” then the response is  “This is Home Page”.
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write('This is Home Page.');
        res.end();
    } else if (req.url === '/about') {
        // 5.If you request this url “/about” then the response is  “This is About Page”.
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write('This is About Page.');
        res.end();
    } else if (req.url === '/contact') {
        // 6.If you request this url “/contact” then the response  is “This is Contact Page”.
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write('This is Contact Page.');
        res.end();
    } else if (req.url === '/file-write') {
        // 7.If you request this url “/file-write” then fs.writeFile() method will create a file “demo.txt” and write the text “hello world” in this file.
        fs.writeFile('demo.txt', 'hello world', (err) => {
            if (err) {
                console.error(err); // Log error instead of throwing
                res.statusCode = 500;
                res.end('Error writing file');
            } else {
                res.end('File written successfully');
            }
        });
    } else if (req.method === 'POST' && req.url === '/upload-file') {
        //8. Show how to upload a file using multer.
        upload.single('file')(req, res, (err) => { // Call middleware correctly
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.write('Something wrong! Upload failed.');
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write('File uploaded successfully!');
                res.end();
            }
        });
    } else {
        res.statusCode = 404;
        res.end('Please, check method and url.');
    }
});
// 2.It should listen on port 5500.
const port = 5500;

server.listen(port, () => {
    // 3.It should log a message to the console when it starts listening on port 5500.
    console.log(`Server running at http://localhost:${port}`);
});

// THANK YOU SIR/MA'AM💘
