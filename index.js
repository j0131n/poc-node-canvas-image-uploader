const express     = require('express');
const bodyParser  = require('body-parser');
const { fs, unlink, unlinkSync }  = require('fs');
const { createCanvas, loadImage } = require('canvas');
const port       = process.env.PORT || 6969;
const app        = express();

const removeFile = (path) => {
  unlink(path, (err) => {
    if (err) throw err;
    console.log('successfully deleted ' + path);
  });
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.post('/boarding-pass', (req, res) => {
  const reqBody = req.body;

  const width  = 1200;
  const height = 630;

  const canvas  = createCanvas(width, height);
  const ctx     = canvas.getContext('2d');

  const halfW     = width / 2;
  const halfH     = height / 2;

  ctx.fillStyle = '#FFCD00';
  ctx.fillRect(0, 0, width, 30);
  ctx.font      = 'bold 14px calibri';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';
  ctx.fillText('Boarding Pass', halfW, 20);

  // this box is for qrcode

  // passenger and flight number box
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 30, width, height);

  // passenger
  ctx.font      = 'bold 14px calibri';
  ctx.fillStyle = '#B2B2B2';
  ctx.textAlign = 'start';
  ctx.fillText('Passenger', 40, 60);

  ctx.font      = 'bold 12pt ';
  ctx.fillStyle = 'black';
  ctx.fillText('Regine Visda', 40, 80);

  // end passenger

  // override configs from top context
  ctx.textAlign = 'start';
  //

  // flight number
  ctx.font      = '12pt';
  ctx.fillStyle = '#B2B2B2';
  ctx.fillText('Flight Number', width - 120, 60);

  ctx.font      = 'bold 12pt';
  ctx.fillStyle = 'black';
  ctx.fillText('5J 580', width - 120, 80);

  // end flight number

  // flight info
  // departure airport city
  ctx.font      = '12pt';
  ctx.fillStyle = '#B2B2B2';
  ctx.fillText('Manila', 40, 120);

  // departure airport_code
  ctx.font      = 'bold 20pt';
  ctx.fillStyle = 'black';
  ctx.fillText('MNL', 40, 160);

  // arrival airport city
  ctx.font      = '12pt';
  ctx.textAlign = 'start';
  ctx.fillStyle = '#B2B2B2';
  // if the text is long -- this is an issue for canvas
  ctx.fillText('Bandar Seri', width - 120, 120);
  ctx.fillText('Begawan', width - 120, 140);
  
  // arrival airport_code
  ctx.font      = 'bold 20pt';
  ctx.fillStyle = 'black';
  ctx.fillText('BWN', width - 120, 180);

  // booking info

  // booking number
  ctx.font      = '12pt';
  ctx.fillStyle = '#B2B2B2';
  ctx.fillText('Booking no.', 40, 220);

  // departure airport_code
  ctx.font      = 'bold 12pt';
  ctx.fillStyle = 'black';
  ctx.fillText('IHE3KT', 40, 240);

  // departure
  ctx.font      = '12pt';
  ctx.fillStyle = '#B2B2B2';
  ctx.fillText('Departure', 220, 220);

  // departure date 
  ctx.font      = 'bold 12pt';
  ctx.fillStyle = 'black';
  ctx.fillText('21 Oct 2021', 220, 240);

  ctx.textAlign = 'start';

  // boarding
  ctx.font      = '12pt';
  ctx.fillStyle = '#B2B2B2';
  ctx.fillText('Boarding', width - 120, 220);

  // boarding time
  ctx.font      = 'bold 12pt';
  ctx.fillStyle = 'black';
  ctx.fillText('12:30 H', width - 120, 240);

  // Seat
  ctx.font      = '12pt';
  ctx.fillStyle = '#B2B2B2';
  ctx.fillText('Seat', 40, 280);

  // Seat Number
  ctx.font      = 'bold 12pt';
  ctx.fillStyle = 'black';
  ctx.fillText('1C', 40, 300);

  // Seq
  ctx.font      = '12pt';
  ctx.fillStyle = '#B2B2B2';
  ctx.fillText('Seq', 220, 280);

  // Seq value
  ctx.font      = 'bold 12pt';
  ctx.fillStyle = 'black';
  ctx.fillText('1', 220, 300);

  ctx.textAlign = "start";

  // Gate
  ctx.font      = '12pt';
  ctx.fillStyle = '#B2B2B2';
  ctx.fillText('Gate', 280, 280);

  // Gate value
  ctx.font      = 'bold 12pt';
  ctx.fillStyle = 'black';
  ctx.fillText('Please check 1', 280, 300);
  ctx.fillText('hour before', 280, 320);
  ctx.fillText('your flight', 280, 340);

  // Airport
  ctx.font      = '12pt';
  ctx.fillStyle = '#B2B2B2';
  ctx.fillText('Airport', 20, 400);

  // Airport value
  ctx.font      = 'bold 12pt';
  ctx.fillStyle = 'black';
  ctx.fillText('Ninoy Aquino International Airport', 20, 420);
  ctx.fillText('Terminal 3', 20, 440);

  // ICTS
  ctx.font      = '12pt';
  ctx.fillStyle = '#B2B2B2';
  ctx.fillText('ICTS', 20, 480);

  // ICTS Value
  ctx.font      = 'bold 12pt';
  ctx.fillStyle = 'black';
  ctx.fillText('-', 20, 500);
  ctx.save();

  const buffer = canvas.toBuffer('image/png');

  fs.writeFileSync('public/test.png', buffer);

  console.log('canvas', canvas);
  console.log('ctx =>', ctx);

  res.sendStatus(200);
  // res.send(canvas);
});

app.listen(port, () => console.info('app is available at http://localhost:' + port));
