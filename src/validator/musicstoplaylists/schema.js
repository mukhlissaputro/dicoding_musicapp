const Joi = require('joi');

const MusicstoplaylistPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = { MusicstoplaylistPayloadSchema };
