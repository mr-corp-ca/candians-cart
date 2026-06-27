import { model, Model, models, Schema, Types } from "mongoose";

export type EventParticipantStatus = "participant" | "winner";

export interface ICustomer {
  userId: Types.ObjectId;
  name: string;
  email: string;
  address: string;
  mobile: string;
  city: string;
  province: string;
  monthlyBudget: number;
  associatedStoreId: Types.ObjectId;
  referralCode: string;
  walletBalance: number;
  giftWalletBalance: number;
  eventParticipant?: EventParticipantStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

const customerSchema = new Schema<ICustomer>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    monthlyBudget: {
      type: Number,
      required: true,
    },
    associatedStoreId: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    referralCode: {
      type: String,
      required: true,
    },
    walletBalance: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Wallet balance cannot be negative"],
    },
    giftWalletBalance: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Gift Wallet balance cannot be negative"],
    },
    eventParticipant: {
      type: String,
      enum: ["participant", "winner"],
      // No default — undefined means they haven't joined the draw yet
    },
  },
  { timestamps: true },
);

const Customer: Model<ICustomer> =
  models.Customer || model<ICustomer>("Customer", customerSchema);

export default Customer;