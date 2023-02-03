import * as SQLite from 'expo-sqlite';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';


export const createDB =  async () => {

console.log('loading db', db)
await db.transaction(tx => {
  console.log('creating table')
  tx.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, user_type TEXT, password TEXT);');
});

// db.transaction(tx => {
//   console.log('selecting names')
//   tx.executeSql('SELECT * FROM names;', null,
//     (txObj, resultSet) => {
//       setNames(resultSet.rows._array)
//     },
//     (txObj, error) => console.log(error)
//   );
// });

console.log('created table')

};