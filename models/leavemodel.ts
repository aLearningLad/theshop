import mongoose, { Schema, model, models } from "mongoose";

const leaveSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    startDay: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
    },
    untilDay: {
      type: String,
      required: true,
    },
    untilMonth: {
      type: String,
      required: true,
    },
    leaveType: {
      type: String,
      required: true,
    },
    leaveStatus: {
      type: Boolean,
      required: true,
    },
    sickNote: {
      type: Boolean,
      required: false,
    },
    isApplied: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const leaveapplication =
  models.leaveapplication || mongoose.model("leaveapplication", leaveSchema);
export default leaveapplication;
