const ShoppingListService = {
  getAllShoppingList(knex) {
    return knex.select('*').from('shopping_list');
  },
  insertShoppingList(knex, newShoppingList) {
    return knex
      .insert(newShoppingList)
      .into('shopping_list')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex
      .from('shopping_list')
      .select('*')
      .where('id', id)
      .first();
  },
  deleteShoppingList(knex, id) {
    return knex('shopping_list')
      .where({ id })
      .delete();
  },
  updateShoppingList(knex, id, newShoppingListFields) {
    return knex('shopping_list')
      .where({ id })
      .update(newShoppingListFields);
  }
};

module.exports = ShoppingListService;