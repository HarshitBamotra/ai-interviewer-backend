const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
    companyName: String,
    interViewRound: String,
    additionalInformation: String,
    systemPrompt: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    conversationHistory: [{ 
      role: String, 
      content: String,
      timestamp: { type: Date, default: Date.now }
    }]
  });

module.exports = mongoose.model('Character', CharacterSchema);