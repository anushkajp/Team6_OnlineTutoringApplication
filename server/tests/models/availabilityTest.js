const Availability = require('../../src/models/availability'); 

describe('Availability', () => {
  test('should create an instance with correct properties', () => {
    const week = ['Monday', 'Wednesday', 'Friday'];
    const exceptions = ['2023-10-05', '2023-10-07'];

    const availabilityInstance = new Availability(week, exceptions);

    // Check if properties are set correctly
    expect(availabilityInstance.week).toEqual(week);
    expect(availabilityInstance.exceptions).toEqual(exceptions);
  });
});
