// Import the object classes
const Tutor = require('../../src/models/tutor');
const User = require('../../src/models/user')
const Availability = require ('../../src/models/availability')

describe('Tutor', () => {
  test('should create an instance of Tutor with correct properties', () => {
    // Create an instance of Tutor
    const tutorInstance = new Tutor("first","last","middle","blank","3201",null,9728061133,"@gmail.com"
    ,"CS","long","short",null, 4.12, null, null);

    // Check if properties are set correctly
    expect(tutorInstance.a).toBe(10);
    expect(tutorInstance.b).toBe(20);
  });
});

jest.mock(Availability, () => {
  return jest.fn().mockImplementation((week, exceptions) => {
    return {
      week,
      exceptions
    };
  });
});

describe('Tutor', () => {
  test('should create an instance with correct properties and availability', () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const middleName = 'M';
    const password = 'password123';
    const userId = 'johndoe123';
    const courses = ['Math', 'Science'];
    const phone = '1234567890';
    const email = 'john@example.com';
    const major = 'Computer Science';
    const longBio = 'Long bio here';
    const shortBio = 'Short bio here';
    const pfp = 'profile-pic.jpg';
    const rating = 4.5;
    const week = ['Monday', 'Wednesday'];
    const exceptions = ['2023-10-05', '2023-10-07'];

    const tutorInstance = new Tutor(
      firstName, lastName, middleName, password, userId,
      courses, phone, email, major, longBio, shortBio,
      pfp, rating, week, exceptions
    );

    // Check if superclass constructor (User) is called
    expect(User).toHaveBeenCalledWith(
      firstName, lastName, middleName, password, userId,
      courses, phone, email, major, longBio, shortBio, pfp
    );

    // Check if additional properties are set correctly
    expect(tutorInstance.rating).toBe(rating);

    // Check if Availability constructor is called with the correct arguments
    expect(require('./path/to/Availability')).toHaveBeenCalledWith(week, exceptions);

    // Check if availability is set correctly
    expect(tutorInstance.availability).toEqual({
      week,
      exceptions
    });
  });
});

