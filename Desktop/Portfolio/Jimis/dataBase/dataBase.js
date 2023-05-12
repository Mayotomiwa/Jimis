import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuItems (id integer primary key autoincrement, title text, name text, description text,image text, category text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuList() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuItems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  db.transaction((tx) => {
    tx.executeSql(
      `insert into menuItems (id, name, price, description, image, category) values ${menuItems
        .map(
          (item) =>
            `('${item.id}', '${item.title}', '${item.name}', '${item.price}', '${item.description}', '${item.image}', '${item.category}')`
        )
        .join(', ')}`
    );
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    if (!query) {
      db.transaction((tx) => {
        tx.executeSql(
          `select * from menuItems where ${activeCategories
            .map((category) => `category='${category}'`)
            .join(' or ')}`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
          }
        );
      }, reject);
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          `select * from menuItems where (title like '%${query}%') and (${activeCategories
            .map((category) => `category='${category}'`)
            .join(' or ')})`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
          }
        );
      }, reject);
    }
  });
}