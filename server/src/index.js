/* eslint-disable no-console */
import express from "express";
import bodyParser from "body-parser";
import router from "./router";

require("dotenv").config();

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
const port = process.env.PORT || 8000;

app.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  return next();
});
app.use("/api/v1", router);

app.use("*", (req, res) => {
  res.send(
    JSON.stringify(
      {
        error: {
          status: "Not Found",
          code: "404",
          message:
            "Resource does not exist, please retry with correct endpoint",
        },
      },
      null,
      2
    )
  );
});

app.listen(port, () => {
  console.log(`connnected on port ${port} running in ${app.get("env")} mode`);
});
