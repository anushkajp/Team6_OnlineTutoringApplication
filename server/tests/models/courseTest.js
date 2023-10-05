const Course = require('./path/to/Course');  // Adjust the path accordingly

describe('Course', () => {
  test('should create an instance with correct properties', () => {
    const name = 'Mathematics';
    const number = 'MATH101';
    const department = 'Mathematics Department';
    const hours = 3;

    const courseInstance = new Course(name, number, department, hours);

    // Check if properties are set correctly
    expect(courseInstance.name).toBe(name);
    expect(courseInstance.number).toBe(number);
    expect(courseInstance.department).toBe(department);
    expect(courseInstance.hours).toBe(hours);
  });
});
