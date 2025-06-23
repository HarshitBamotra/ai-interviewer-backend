const multer = jest.fn(() => ({
  single: jest.fn(() => (req, res, next) => {
    if (req.body.mockFile) {
      req.file = {
        path: 'https://res.cloudinary.com/mock/image/upload/v123456789/characters/mock-image.jpg',
        filename: 'mock-image',
        public_id: 'characters/mock-image',
        mimetype: 'image/jpeg',
        size: 12345
      };
    }
    next();
  }),
  array: jest.fn(() => (req, res, next) => next()),
  fields: jest.fn(() => (req, res, next) => next()),
  none: jest.fn(() => (req, res, next) => next()),
  any: jest.fn(() => (req, res, next) => next())
}));

multer.memoryStorage = jest.fn();
multer.diskStorage = jest.fn();

module.exports = multer;