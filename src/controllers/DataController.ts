/**
 * @file Controller for data needs
 * @author Sebastian Gadzinski
 */

import Result from '../classes/Result';
import { Translation, User } from '../models';
import ChatGPTService from '../services/ChatGPTService';

class DataController {
    public async translations(req: any, res: any) {
        try {
            const translations = await Translation.find({ userId: req.user.data.id },
                { message: 1, translation: 1, settings: 1 })
                .sort({ createdAt: -1 })
                .limit(10)
                .lean();

            res.send(new Result({ data: translations, success: true }));
        } catch (err) {
            res.send(new Result({ message: err.message, success: false }));
        }
    }

    public async translate(req: any, res: any) {
        try {
            const user = await User.findById(req.user.data.id);
            const translation = await ChatGPTService.soundSmarter(user, req.body);
            res.send(new Result({ data: translation, success: true }));
        } catch (err) {
            res.send(new Result({ message: err.message, success: false }));
        }
    }
}

export default new DataController();
