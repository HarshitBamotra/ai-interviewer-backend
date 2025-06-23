const mockCloudinary = {
  v2: {
    config: jest.fn(),
    uploader: {
      upload: jest.fn(),
      destroy: jest.fn()
    }
  }
};

module.exports = mockCloudinary;