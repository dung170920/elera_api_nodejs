export const formatToJson = {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
};

export function currentDate() {
  return new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
}
