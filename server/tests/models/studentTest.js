const Student = require('../../src/models/student'); 
const User = require('../../src/models/user');

describe('Student', () => {
  test('should create an instance with correct properties', () => {
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

    const studentInstance = new Student(
      firstName, lastName, middleName, password, userId,
      courses, phone, email, major, longBio, shortBio, pfp
    );

    // Check if superclass constructor (User) is called
    expect(User).toHaveBeenCalledWith(
      firstName, lastName, middleName, password, userId,
      courses, phone, email, major, longBio, shortBio, pfp
    );

    // Check if properties are set correctly
    expect(studentInstance.firstName).toBe(firstName);
    expect(studentInstance.lastName).toBe(lastName);
    expect(studentInstance.middleName).toBe(middleName);
    expect(studentInstance.password).toBe(password);
    expect(studentInstance.userId).toBe(userId);
    expect(studentInstance.courses).toEqual(courses);
    expect(studentInstance.phone).toBe(phone);
    expect(studentInstance.email).toBe(email);
    expect(studentInstance.major).toBe(major);
    expect(studentInstance.longBio).toBe(longBio);
    expect(studentInstance.shortBio).toBe(shortBio);
    expect(studentInstance.pfp).toBe(pfp);
  });
});
