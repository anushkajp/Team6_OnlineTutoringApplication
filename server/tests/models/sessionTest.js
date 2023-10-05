const Session = require('../../src/models/session');

describe('Session', () => {
  test('should create an instance with correct properties', () => {
    const tutorId = 'tutor123';
    const studentId = 'student456';
    const datetime = '2023-10-05T15:30:00';
    const length = 60;
    const online = true;
    const location = 'Online';
    const notes = 'Test session';
    const feedback = 'Great session!';

    const sessionInstance = new Session(
      tutorId, studentId, datetime, length, online,
      location, notes, feedback
    );

    // Check if properties are set correctly
    expect(sessionInstance.tutorId).toBe(tutorId);
    expect(sessionInstance.studentId).toBe(studentId);
    expect(sessionInstance.datetime).toBe(datetime);
    expect(sessionInstance.length).toBe(length);
    expect(sessionInstance.online).toBe(online);
    expect(sessionInstance.location).toBe(location);
    expect(sessionInstance.notes).toBe(notes);
    expect(sessionInstance.feedback).toBe(feedback);
  });
});
