const Review = require('../../../src/models/review');

describe('Review', () => {
  test('should create an instance with correct properties', () => {
    const tutorId = 'tutor123';
    const studentId = 'student456';
    const rating = 4.5;
    const reviewText = 'This is a great tutor!';

    const reviewInstance = new Review(tutorId, studentId, rating, reviewText);

    // Check if properties are set correctly
    expect(reviewInstance.tutorId).toBe(tutorId);
    expect(reviewInstance.studentId).toBe(studentId);
    expect(reviewInstance.rating).toBe(rating);
    expect(reviewInstance.review).toBe(reviewText);
  });
});
