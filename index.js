var fs = require("fs");
var inquirer = require ("inquirer");
var colorName = require ("color-name");
var { Circle, Triangle, Square } = require("./lib/shapes.js");

function colorValidate(input) {
  var color = input.toLowerCase();

  // check if input is a valid color keyword
  if (colorName[color]) {
    return true;
  }

  if (!color.startsWith("#")) {
    color = `#${color}`;
    if (/^#?([0-9a-fA-F]{3}){1,2}$/.test(color)) {
      return true;
    }
  }
  // check if input is a valid hexadecimal color code with or without the "#" character


  return "Please enter a valid color keyword or hexadecimal color code";
}


inquirer
  .prompt([
    {
      type: "input",
      message: "Please select up to three characters as your logo text",
      name: "logoText",
      validate: function (input) {
        return input.length <= 3
          ? true
          : "Please enter up to three characters";
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
        "Please enter a color keyword OR a hexadecimal code for the shape you selected",
      name: "shapeColor",
      validate: colorValidate,
    },
  ])
  .then(async (answers) => {
    const { shape, logoText, textColor, shapeColor } = answers;

    // Create a new shape object based on user input
    let logoShape;
    switch (shape) {
      case "Circle":
        logoShape = new Circle();
        break;
      case "Triangle":
        logoShape = new Triangle();
        break;
      case "Square":
        logoShape = new Square();
        break;
      default:
        console.log("Invalid shape selected");
        return;
    }

    // Set the color of the shape object based on user input

    // Create a new text object based on user input
    const logoTextObj = {
      text: logoText,
      color: textColor
    }
    logoShape.setColor(shapeColor);

    // Generate the logo SVG and save it to a file
    const logoSVG = `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">${logoShape.render()}<text x="150" y="150" font-size="55" fill="${logoTextObj.color}" text-anchor="middle" alignment-baseline="central">${logoTextObj.text.toUpperCase()}</text></svg>`;


    const logoFilename = `${logoText}.svg`;
    try {
      await fs.writeFile(logoFilename, logoSVG, function (err) {
        if (err) throw err;
        console.log(`Logo generated and saved to file: ${logoFilename}`);
      });
    } catch (error) {
      console.log(`Error writing file: ${error.message}`);
    }
    
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt cannot be rendered in the current environment");
    } else {
      console.log("Error:", error);
    }
  });
