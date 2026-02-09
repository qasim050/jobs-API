require('dotenv').config();
require('express-async-errors');
const express = require('express');
const authRouter = require("./routes/auth")
const jobsRouter = require("./routes/jobs")
const authenticationUser = require("./middleware/authentication")
const app = express();

//security
// const cors = require("cros")
const helmet = require("helmet")
const xss = require("xss-clean")
const retelimiter = require("express-rate-limit")

//docs

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./openapi.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// error handler 
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

const connectDB = require("./db/connect")
// routes
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/jobs",authenticationUser,jobsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.set("trust proxy",1)
app.use(retelimiter({windowMs:1000*60*15
  ,  max : 100}))
app.use(xss)
// app.use(cors)
app.use(helmet)

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error); 
  }
};

start();
