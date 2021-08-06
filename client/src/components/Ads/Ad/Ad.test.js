const isCreator = require('./Ad.js')

test('should return false', () => {
    expect(isCreator()).toBeTruthy();
  });