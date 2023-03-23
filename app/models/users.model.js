module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            mail: String,
            password: String,
			code: Number,
			broker: String
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
      const Users = mongoose.model("users", schema);
    return Users;
  };
