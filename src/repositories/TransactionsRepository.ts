import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {

  public async getBalance(): Promise<Balance> {

    const transactions = await this.find();

    const balance = await this.getSumBalanceByType(transactions);

    return balance;
  }

  private async getSumBalanceByType(transactions: Transaction[]): Promise<Balance> {

    const { income, outcome } = transactions.reduce((cont, transaction) => {
      switch (transaction.type) {
        case 'income':
          cont.income += Number(transaction.value);
          break;
        case 'outcome':
          cont.outcome += Number(transaction.value);
          break;
        default:
          break;
      }

      return cont;
    }, {
      income: 0,
      outcome: 0,
      total: 0,
    });

    const total = income - outcome;

    return { income, outcome, total };
  }

}

export default TransactionsRepository;
