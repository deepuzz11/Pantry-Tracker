// models/PantryItem.js
import mongoose from 'mongoose';

const PantryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.models.PantryItem || mongoose.model('PantryItem', PantryItemSchema);
