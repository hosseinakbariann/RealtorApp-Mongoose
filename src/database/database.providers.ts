
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect("mongodb://partdcInvestmentFunds:0860117685hosseiN@192.168.5.82:27017/realtorApp?authSource=admin"),
  }
];
