import mongoose, { Document, Schema } from 'mongoose';
import timestamp from 'mongoose-timestamp';

export enum Severity {
    Critical = 'Critical',
    Major = 'Major',
    Medium = 'Medium',
    Low = 'Low',
}

export interface BugDocument extends Document {
    title: string;
    description: string;
    source: string;
    severity: Severity;
    raised_by: mongoose.Types.ObjectId;
}

const BugSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    source: { type: String, required: true },
    severity: { type: String, enum: Object.values(Severity), required: true },
    raised_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
},{
    versionKey:false
});

BugSchema.plugin(timestamp);

export const Bug = mongoose.models.Bug || mongoose.model<BugDocument>('Bug', BugSchema);
