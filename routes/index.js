var express = require('express');
var router = express.Router();
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

async function getVision(url) {
	const [result] = await client.textDetection(url);
	const detections = result.textAnnotations;
	console.log(detections);
	return detections;
}

router.get('/api', async function(req, res, next) {
	
	const jsonResponse = await getVision(req.query.url);

	res.json(jsonResponse);
});

module.exports = router;
