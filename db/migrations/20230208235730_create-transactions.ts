import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  const transaction = await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
    table.integer('amount', 10).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })

  return transaction;
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions')
}

