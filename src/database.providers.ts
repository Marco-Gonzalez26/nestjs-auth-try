import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb://always_dev:2WY57PfnMpcdVUIi@googleauth.rbfubgy.mongodb.net/googleauth',
      ),
  },
];
