/**
 * HashTag
 *
 * @module      :: Model
 * @description :: Represents a tag used to filter tweets by topic.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  schema: true,

  attributes: {

    text: {
      type: 'string',
      maxLength: 40,
      required: true,
      unique: true
    }
  }
};
