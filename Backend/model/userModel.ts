import mongoose, { Document, Schema } from 'mongoose';
import timestamp from 'mongoose-timestamp';

export interface UserDocument extends Document {
    name: string;
    avatar: string;
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true, maxlength: 50 },
    avatar: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},{
    versionKey:false
});

UserSchema.plugin(timestamp);

export const User = mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);
