const InvariantError = require('../../exceptions/InvariantError');
const { MusicstoplaylistPayloadSchema } = require('./schema');

const MusicstoplaylistsValidator = {
  validateMusicstoplaylistPayload: (payload) => {
    const validationResult = MusicstoplaylistPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = MusicstoplaylistsValidator;
