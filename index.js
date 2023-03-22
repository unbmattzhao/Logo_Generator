import fs from "fs";
import inquirer from "inquirer";
import colorName from "color-name";
import("./shapes.js");
// import from;
// import from;

function colorValidate(input) {
  // check if input is a valid color keyword
  if (colorName[input.toLowerCase()]) {
    return true;
  }

  // check if input is a valid hexadecimal color code
  if (/^#?([0-9a-fA-F]{3}){1,2}$/.test(input)) {
    return true;
  }

  return "Please enter a valid color keyword or hexadecimal color code";
}

inquirer
  .prompt([
    {
      type: " input",
      message: "Please select up to three characters as your logo text",
      name: "logoText",
      validate: function (input) {
        return input.length < 4
          ? true
          : "Please enter less than three characters";
      },
    },
    {
      type: "input",
      message:
        "Please enter a color keyword OR a hexadecimal code for the logo text",
      name: "textColor",
      validate: colorValidate,
    },
    {
      type: "list",
      message: "Please select a shape for your logo",
      name: "shape",
      choices: ["Circle", "Triangle", "Square"],
    },
    {
      type: "input",
      message:
        "Please enter a color keyword OR a hexadecimal code for the shape your selected",
      name: "shapeColor",
      validate: colorValidate,
    },
  ])
  .then((answers) => {
    answers.jason();
  })
  .catch((error) => {
    if (error.isTtyError) {
    } else {
    }
  });

function generateLogo(shape, logoText, textColor, logoColor) {}
