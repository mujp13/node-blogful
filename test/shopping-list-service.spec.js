const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe(`Shopping-list service object`, function() {
  let db;

  let testShoppingList = [
    {
      id: 1,
      name: 'Doritos',
      price: 1.5,
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      checked: false,
      category: 'Snack'
    },
    {
      id: 2,
      name: 'Twinkies',
      price: 2.5,
      date_added: new Date('2029-03-22T16:28:32.615Z'),
      checked: false,
      category: 'Snack'
    },
    {
      id: 3,
      name: 'Korean Ramen',
      price: 3.0,
      date_added: new Date('2029-04-22T16:28:32.615Z'),
      checked: true,
      category: 'Lunch'
    },
    {
      id: 4,
      name: 'Breakfast Burrito',
      price: 2.0,
      date_added: new Date('2029-05-22T16:28:32.615Z'),
      checked: false,
      category: 'Breakfast'
    },
    {
      id: 5,
      name: 'Pizza',
      price: 3.2,
      date_added: new Date('2029-07-22T16:28:32.615Z'),
      checked: false,
      category: 'Main'
    }
  ];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
  });

  before(() => db('shopping_list').truncate()); // Need to clear the table so we have a fresh start every time we run the tests.
  afterEach(() => db('shopping_list').truncate()); // Avoid test leak (one test is affecting another test, every test should clean up after itself)
  after(() => db.destroy()); // disconnect the db connection

  describe(`getAllShoppingList()`, () => {
    context(`Given 'shopping_list' has data`, () => {
      beforeEach(() => {
        return db.into('shopping_list').insert(testShoppingList);
      });

      // Test for updating an shoppinglist
      // it(`updateshoppinglist() updates an shoppinglist from the 'shopping_list' table`, () => {
      //   const idOfShoppingListToUpdate = 3;
      //   const newShoppingListData = {
      //     name: 'updated name',
      //     price: 1.50,
      //     date_added: new Date(),
      //     category: 'updated category'
      //   };
      //   return ShoppingListService.updateshoppinglist(db, idOfShoppingListToUpdate, newShoppingListData)
      //     .then(() => ShoppingListService.getById(db, idOfShoppingListToUpdate))
      //     .then(shoppinglist => {
      //       expect(shoppinglist).to.eql({
      //         id: idOfShoppingListToUpdate,
      //         ...newShoppingListData
      //       });
      //     });
      // });

      // Test for deleting an shoppinglist
      // it(`deleteshoppinglist() removes an shoppinglist by id from 'shopping_list' table`, () => {
      //   const shoppinglistId = 3;
      //   return ShoppingListService.deleteshoppinglist(db, shoppinglistId)
      //     .then(() => ShoppingListService.getAllShoppingList(db))
      //     .then(allshoppinglists => {
      //       // copy the test shoppinglists array without the "deleted" shoppinglist
      //       const expected = testShoppingList.filter(shoppinglist => shoppinglist.id !== shoppinglistId);
      //       expect(allshoppinglists).to.eql(expected);
      //     });
      // });

      // Test fro getting a sepcific shoppinglist
      // it(`getById() resolves an shoppinglist by id from 'shopping_list' table`, () => {
      //   const thirdId = 3;
      //   const thirdTestshoppinglist = testShoppingList[thirdId - 1];
      //   return ShoppingListService.getById(db, thirdId).then(actual => {
      //     expect(actual).to.eql({
      //       id: thirdId,
      //       name: thirdTestshoppinglist.title,
      //       price: thirdTestshoppinglist.content,
      //       date_added: thirdTestshoppinglist.date_added,
      //       category: thirdTestshoppinglist.category
      //     });
      //   });
      // });

      it(`getAllShoppingList() resolves all shoppinglists from 'shopping_list' table`, () => {
        // test that ShoppingListService.getAllShoppingList gets data from table
        return ShoppingListService.getAllShoppingList(db).then(actual => {
          expect(actual).to.eql(testShoppingList);
        });
      });
    });
    context(`Given 'shopping_list' has no data`, () => {
      it(`getAllShoppingList() resolves an empty array`, () => {
        return ShoppingListService.getAllShoppingList(db).then(actual => {
          expect(actual).to.eql([]);
        });
      });

      it(`insertShoppingList() inserts a new shoppinglist and resolves the new shoppinglist with an 'id'`, () => {
        const newShoppingList = {
          name: 'Test new name',
          price: 2.50,
          date_added: new Date('2020-01-01T00:00:00.000Z'),
          category: 'Test new category'
        };
        return ShoppingListService.insertShoppingList(db, newShoppingList).then(actual => {
          expect(actual).to.eql({
            id: 1,
            name: newShoppingList.name,
            price: newShoppingList.price,
            date_added: newShoppingList.date_added,
            category: newShoppingList.category
          });
        });
      });
    });
  });
})