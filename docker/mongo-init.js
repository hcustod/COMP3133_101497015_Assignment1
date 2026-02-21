const dbName = 'comp3133_101497015_Assigment1';
const dbRef = db.getSiblingDB(dbName);

const collections = dbRef.getCollectionNames();

if (!collections.includes('users')) {
  dbRef.createCollection('users', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['username', 'email', 'password', 'created_at', 'updated_at'],
        properties: {
          username: { bsonType: 'string', minLength: 3, maxLength: 50 },
          email: { bsonType: 'string' },
          password: { bsonType: 'string' },
          created_at: { bsonType: 'date' },
          updated_at: { bsonType: 'date' }
        }
      }
    }
  });
}

if (!collections.includes('employees')) {
  dbRef.createCollection('employees', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'first_name',
          'last_name',
          'email',
          'gender',
          'designation',
          'salary',
          'date_of_joining',
          'department',
          'created_at',
          'updated_at'
        ],
        properties: {
          first_name: { bsonType: 'string' },
          last_name: { bsonType: 'string' },
          email: { bsonType: 'string' },
          gender: { enum: ['Male', 'Female', 'Other'] },
          designation: { bsonType: 'string' },
          salary: { bsonType: 'number', minimum: 1000 },
          date_of_joining: { bsonType: 'date' },
          department: { bsonType: 'string' },
          employee_photo: { bsonType: ['string', 'null'] },
          created_at: { bsonType: 'date' },
          updated_at: { bsonType: 'date' }
        }
      }
    }
  });
}

dbRef.users.createIndex({ username: 1 }, { unique: true, name: 'unique_username' });
dbRef.users.createIndex({ email: 1 }, { unique: true, name: 'unique_user_email' });
dbRef.employees.createIndex({ email: 1 }, { unique: true, name: 'unique_employee_email' });

print(`Initialized database: ${dbName}`);
