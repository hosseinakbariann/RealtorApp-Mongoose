
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect("mongodb://user:pass@127.0.0.1:27017/onlineStore?authSource=admin"),
  }
];
