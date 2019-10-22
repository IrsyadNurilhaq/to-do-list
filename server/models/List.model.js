const mongoose       = require('mongoose');
const Schema         = mongoose.Schema;
const mongooseHidden = require('mongoose-hidden')()

let ListSchema = new Schema({
    creator : {type: Schema.Types.ObjectId, ref: 'User', hide: true},
    content : {type: String, required: true},
    is_done : {type: Boolean, default: false}
},{
    timestamps: { createdAt: true, updatedAt: false }
});

ListSchema.plugin(mongooseHidden)

module.exports = mongoose.model('List', ListSchema);