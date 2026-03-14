import mongoose, { Schema, Document } from "mongoose"

export interface IEWayBillItem {
  productName: string
  hsnCode: string
  quantity: number
  unit: string
  taxableValue: number
  cgstRate: number
  sgstRate: number
  igstRate: number
  cessRate: number
}

export interface IEWayBill extends Document {
  userId: string

  // Linked invoice (optional)
  invoiceId?: string
  invoiceNumber?: string

  // Transaction details
  supplyType: string        // O=Outward, I=Inward
  subSupplyType: string     // 1=Supply, 2=Import, 3=Export, 4=Job Work...
  docType: string           // INV=Invoice, CHL=Challan, BIL=Bill of Entry
  docNumber: string
  docDate: string

  // From (Consignor)
  fromGSTIN: string
  fromTradeName: string
  fromAddress1: string
  fromAddress2: string
  fromPincode: string
  fromStateCode: string

  // To (Consignee)
  toGSTIN: string
  toTradeName: string
  toAddress1: string
  toAddress2: string
  toPincode: string
  toStateCode: string

  // Items
  items: IEWayBillItem[]

  // Transport
  transporterName: string
  transporterId: string
  transportMode: string     // 1=Road, 2=Rail, 3=Air, 4=Ship
  vehicleType: string       // R=Regular, O=ODC
  vehicleNumber: string
  distance: number          // in KM

  // Totals
  totalValue: number
  cgstValue: number
  sgstValue: number
  igstValue: number
  cessValue: number

  // Status & EBN
  status: "draft" | "ready" | "submitted" | "active" | "cancelled"
  ebn: string               // E-Way Bill Number from NIC
  ebnGeneratedAt?: Date
  validUpto?: Date

  // API slot (for future GSP integration)
  gspResponse?: string

  createdAt: Date
  updatedAt: Date
}

const EWayBillItemSchema = new Schema<IEWayBillItem>({
  productName: { type: String, required: true },
  hsnCode:     { type: String, required: true },
  quantity:    { type: Number, required: true },
  unit:        { type: String, default: "NOS" },
  taxableValue:{ type: Number, required: true },
  cgstRate:    { type: Number, default: 0 },
  sgstRate:    { type: Number, default: 0 },
  igstRate:    { type: Number, default: 0 },
  cessRate:    { type: Number, default: 0 },
})

const EWayBillSchema = new Schema<IEWayBill>({
  userId:       { type: String, required: true, index: true },
  invoiceId:    { type: String },
  invoiceNumber:{ type: String },

  supplyType:    { type: String, default: "O" },
  subSupplyType: { type: String, default: "1" },
  docType:       { type: String, default: "INV" },
  docNumber:     { type: String, required: true },
  docDate:       { type: String, required: true },

  fromGSTIN:     { type: String },
  fromTradeName: { type: String },
  fromAddress1:  { type: String },
  fromAddress2:  { type: String },
  fromPincode:   { type: String },
  fromStateCode: { type: String },

  toGSTIN:       { type: String },
  toTradeName:   { type: String },
  toAddress1:    { type: String },
  toAddress2:    { type: String },
  toPincode:     { type: String },
  toStateCode:   { type: String },

  items: [EWayBillItemSchema],

  transporterName: { type: String },
  transporterId:   { type: String },
  transportMode:   { type: String, default: "1" },
  vehicleType:     { type: String, default: "R" },
  vehicleNumber:   { type: String },
  distance:        { type: Number, default: 0 },

  totalValue:  { type: Number, default: 0 },
  cgstValue:   { type: Number, default: 0 },
  sgstValue:   { type: Number, default: 0 },
  igstValue:   { type: Number, default: 0 },
  cessValue:   { type: Number, default: 0 },

  status:          { type: String, enum: ["draft", "ready", "submitted", "active", "cancelled"], default: "draft" },
  ebn:             { type: String, default: "" },
  ebnGeneratedAt:  { type: Date },
  validUpto:       { type: Date },
  gspResponse:     { type: String },

}, { timestamps: true })

export default mongoose.models.EWayBill || mongoose.model<IEWayBill>("EWayBill", EWayBillSchema)