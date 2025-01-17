import {
  bgWhite,
  black,
  blue,
  cyan,
  gray,
  green,
  red,
  white,
  yellow,
} from "colorette";

export const logger = {
  info: (message: string, data?: any) => {
    console.log(
      blue("ℹ INFO: ") +
        white(message) +
        (data ? "\n" + gray(JSON.stringify(data, null, 2)) : "")
    );
  },

  success: (message: string, data?: any) => {
    console.log(
      green("✓ SUCCESS: ") +
        white(message) +
        (data ? "\n" + gray(JSON.stringify(data, null, 2)) : "")
    );
  },

  error: (message: string, error?: any) => {
    console.error(
      red("✖ ERROR: ") +
        white(message) +
        (error ? "\n" + red(JSON.stringify(error, null, 2)) : "")
    );
  },

  warn: (message: string, data?: any) => {
    console.warn(
      yellow("⚠ WARNING: ") +
        white(message) +
        (data ? "\n" + gray(JSON.stringify(data, null, 2)) : "")
    );
  },

  request: (req: any) => {
    const { method, url, headers, body } = req;
    console.log(
      bgWhite(black("\n📥 REQUEST: " + new Date().toISOString())) +
        "\n" +
        cyan("Method: ") +
        white(method) +
        "\n" +
        cyan("URL: ") +
        white(url) +
        "\n" +
        cyan("Body: ") +
        "\n" +
        gray(JSON.stringify(body, null, 2))
    );
  },

  response: (res: any, body: any) => {
    if (res.statusCode < 400) {
      console.log(
        "\n📤 RESPONSE: " +
          white(new Date().toISOString()) +
          "\n" +
          green("Status: ") +
          white(res.statusCode) +
          "\n" +
          green("Body: ") +
          "\n" +
          gray(body) +
          "\n" +
          blue("==============================")
      );
    } else {
      console.log(
        red("\n📤 RESPONSE: ") +
          white(new Date().toISOString()) +
          "\n" +
          red("Status: ") +
          white(res.statusCode) +
          "\n" +
          red("Body: ") +
          "\n" +
          gray(body) +
          "\n" +
          blue("==============================")
      );
    }
  },
};
