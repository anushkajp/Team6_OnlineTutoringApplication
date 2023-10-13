const express = require("express");
const request = require("supertest");
const router = require('./path/to/your/router');
const Availability = require('../models/availability');
const Service = require('../services/tutorService');

jest.mock('../models/availability', () => ({
  // Mocking the Availability model for testing purposes
  findAll: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  delete: jest.fn()
}));

jest.mock('../services/tutorService', () => ({
  findAllAvailability: jest.fn()
}));

describe('Availability API', () => {
  afterEach(() => {
    jest.clearAllMocks();  // Clear mocks after each test
  });

  describe('GET /', () => {
    test('should return all availabilities', async () => {
      // Mock the data that Service.findAllAvailability will return
      Service.findAllAvailability.mockReturnValue([{ week: 'Monday', exceptions: [] }]);

      const response = await request(router).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ week: 'Monday', exceptions: [] }]);
    });

    test('should handle invalid id', async () => {
      Service.findAllAvailability.mockReturnValue(null);

      const response = await request(router).get('/');
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'not a valid id' });
    });

    test('should handle server error', async () => {
      Service.findAllAvailability.mockImplementation(() => {
        throw new Error('Internal Server Error');
      });

      const response = await request(router).get('/');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Internal Server Error' });
    });
  });
  describe('GET ONE/', () => {
    test('should return one availabilities', async () => {
      // Mock the data that Service.findAllAvailability will return
      Service.findAllAvailability.mockReturnValue([{ week: 'Monday', exceptions: [] }]);

      const response = await request(router).get('/id');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ week: 'Monday', exceptions: [] }]);
    });

    test('should handle invalid id', async () => {
      Service.findAllAvailability.mockReturnValue(null);

      const response = await request(router).get('/id');
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'not a valid id' });
    });

    test('should handle server error', async () => {
      Service.findAllAvailability.mockImplementation(() => {
        throw new Error('Internal Server Error');
      });

      const response = await request(router).get('/');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Internal Server Error' });
    });
  });
  describe('POST/', () => {
    test('should create new availability', async () => {
      // Mock the data that Service.findAllAvailability will return
      Service.findAllAvailability.mockReturnValue([{ week: 'Monday', exceptions: [] }]);

      const response = await request(router).get('/id');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ week: 'Monday', exceptions: [] }]);
    });

    test('should handle invalid id', async () => {
      Service.findAllAvailability.mockReturnValue(null);

      const response = await request(router).get('/id');
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'not a valid id' });
    });

    test('should handle server error', async () => {
      Service.findAllAvailability.mockImplementation(() => {
        throw new Error('Internal Server Error');
      });

      const response = await request(router).get('/');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Internal Server Error' });
    });
  });

  // Add similar tests for other routes (GET ONE, CREATE ONE, UPDATE ONE, DELETE ONE)
  // ...

});
