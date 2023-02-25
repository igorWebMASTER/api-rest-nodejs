import {  beforeAll, afterAll, it, expect, describe } from 'vitest';
import request from 'supertest';
import { app } from '../app';

describe('Transaction routes', () => {
  beforeAll(async () => {
    await app.ready()
  })
  
  afterAll(async()=> {
    await app.close()
  })

  const makeTransactions = () => {
    
  }
  
  it('should be able to create a new transaction', async () => {
   const response = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transactions',
        amount: 5000,
        type: 'credit'
      })
      .expect(201)
  })


  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transactions',
        amount: 5000,
        type: 'credit'
      })

      const cookies = createTransactionResponse.get('Set-Cookie')

      const listTransactionsResponse = await request(app.server)
        .get('/transactions')
        .set('Cookie', cookies)
        .expect(200)

      expect(listTransactionsResponse.body.transactions).toEqual([
        expect.objectContaining({
          title: 'New transactions',
          amount: 5000
        })
      ])

  })
})

