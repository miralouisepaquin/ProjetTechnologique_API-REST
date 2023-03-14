module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            friendlyName: String,
            room: String
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
      const Sensors = mongoose.model("sensors", schema);
    return Sensors;
  };
