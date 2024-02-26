import mongoose, { Schema, model, models } from "mongoose";

const payslipSchema = new Schema({
  drivelink: String,
  forMonth: String,
});

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    moreInfo: {
      type: String,
      required: false,
    },
    leaveStatus: {
      type: Boolean,
      required: true,
    },
    passport: {
      type: String,
      required: true,
    },
    isApplied: {
      type: Boolean,
      required: true,
    },
    payslips: [payslipSchema],
    leaveDays: {
      type: Number,
      required: true,
    },
    remainingDays: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
);

const Employee = models.Employee || mongoose.model("Employee", employeeSchema);
export default Employee;
