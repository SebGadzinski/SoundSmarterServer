/**
 * @file Defines a schema for the user collection.
 * @author Sebastian Gadzinski
 */
import mongoose, { Document, Model, Schema } from 'mongoose';
import { transform } from '../utils/transform';

export interface ITranslation extends Document {
    _id: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    message: string;
    translation: string;
    settings: ITranslationSetting;
}

interface ITranslationSetting extends Document {
    negatives?: string;
    positives?: string;
    actor?: string;
    gender?: string;
    tone?: string;
    language?: string;
    to?: string;
}

interface ITranslationModel extends Model<ITranslation> {
    // Add any static methods here if needed
}

const TranslationSettingSchema: Schema = new mongoose.Schema(
    {
        negatives: { type: String },
        positives: { type: String },
        actor: { type: String },
        gender: { type: String },
        tone: { type: String },
        language: { type: String },
        to: { type: String }
    },
    {
        _id: false
    }
);

const TranslationSchema: Schema = new mongoose.Schema(
    {
        userId: { type: Schema.Types.ObjectId, required: true },
        message: { type: String, required: true },
        translation: { type: String, required: true },
        settings: { type: TranslationSettingSchema, required: true }
    },
    {
        timestamps: true,
        toJSON: { transform }
    }
);

const Translation: ITranslationModel = mongoose.model<ITranslation, ITranslationModel>(
    'translation',
    TranslationSchema
);
export default Translation;
