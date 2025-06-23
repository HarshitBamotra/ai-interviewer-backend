const mockCloudinaryStorage = jest.fn().mockImplementation(() => ({
  _handleFile: jest.fn((req, file, cb) => {
    cb(null, {
      path: 'https://res.cloudinary.com/mock/image/upload/v123456789/characters/mock-image.jpg',
      filename: 'mock-image',
      public_id: 'characters/mock-image'
    });
  }),
  _removeFile: jest.fn((req, file, cb) => {
    cb(null);
  })
}));

module.exports = { CloudinaryStorage: mockCloudinaryStorage };

