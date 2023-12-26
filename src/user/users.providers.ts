import { Connection } from 'mongoose';
import { UsersSchema } from '../../schemas/users.schema';

export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model('Users', UsersSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
