const { Circle, Square, Triangle } = require('./shapes');

describe('Shape classes', () => {
  describe('Circle', () => {
    test('renders a circle SVG string with color', () => {
      const circle = new Circle();
      circle.setColor('red');
      const result = circle.render();
      expect(result).toBe('<circle cx="50%" cy="50%" r="100" fill="red"/>');
    });
  });

  describe('Square', () => {
    test('renders a square SVG string with color', () => {
      const square = new Square();
      square.setColor('blue');
      const result = square.render();
      expect(result).toBe('<rect x="25" y="25" width="250" height="250" fill="blue"/>');
    });
  });

  describe('Triangle', () => {
    test('renders a triangle SVG string with color', () => {
      const triangle = new Triangle();
      triangle.setColor('green');
      const result = triangle.render();
      expect(result).toBe('<polygon points="0,200 300,200 150,30" fill="green"/>');
    });
  });
});
