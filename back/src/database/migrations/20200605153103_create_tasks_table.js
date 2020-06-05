exports.up = function (knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments();
    table.integer('user_id').references('id').inTable('users').notNullable();
    table.string('description').notNullable();
    table.boolean('completed').defaultTo(false);
    table.boolean('deleted').defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('tasks');
};
