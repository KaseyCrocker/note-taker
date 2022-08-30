const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;


app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


require('./routes/apiRoutes/index.js')(app);
require('./routes/htmlRoutes/index.js')(app);


app.listen(PORT, () => {
  console.log(`Server available at localhost${PORT}`);
});
