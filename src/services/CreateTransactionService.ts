import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import { getRepository } from 'typeorm';
import Category from '../models/Category';
import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category
  }: Request): Promise<Transaction> {

    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const categoryRepository = getRepository(Category);

    const { total } = await transactionsRepository.getBalance();

    if( type === 'outcome' && total < value){
      throw new AppError('You do not have enough balance.');
    }

    const categoryObject = await categoryRepository.findOne({
      where: { title: category },
    });

    let id = categoryObject?.id;

    if (!categoryObject) {
      const categoryObject = categoryRepository.create({ title: category });
      await categoryRepository.save(categoryObject);
      id = categoryObject.id;
    }

    const transactionRepository = getRepository(Transaction);

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
