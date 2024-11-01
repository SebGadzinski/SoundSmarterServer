import _ from 'lodash';
import Result from '../classes/Result';
import {
    User,
} from '../models';

class AdminController {

    public async getUserPageData(req: any, res: any) {
        try {
            const users: any = await User.find({},
                {
                    userId: '$_id',
                    fullName: 1,
                    email: 1,
                    emailConfirmed: 1,
                    phoneNumber: 1,
                    mfa: 1,
                    works: 1
                }).lean();

            res.send(new Result({ data: users, success: true }));
        } catch (err) {
            res.send(new Result({ message: err.message, success: false }));
        }
    }
}

export default new AdminController();
