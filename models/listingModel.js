const mongoose = require("mongoose");

const listingSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: [40, "Title must be less than 40 characters long."],
    },
    images: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["Standard", "Stack", "Squeezemallow", "Tin", "Hug Mee"],
      required: true,
    },
    condition: {
      type: String,
      enum: ["Brand New", "Like New", "Used"],
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

listingSchema.methods.toClient = function () {
  return {
    id: this._id,
    title: this.title,
    description: this.description,
    condition: this.condition,
    type: this.type,
    price: this.price,
    images: this.images,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    author: this.author,
  };
};

listingSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

listingSchema.set("toJSON", { virtuals: true });

listingSchema.statics.find;

module.exports = mongoose.model("Listing", listingSchema);
