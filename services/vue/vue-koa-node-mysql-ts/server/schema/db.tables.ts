// tslint:disable
import * as path from 'path';
import * as sequelize from 'sequelize';
import * as def from './db';

export interface ITables {
  users:def.usersModel;
  transform:def.transformModel;
}

export const getModels = function(seq:sequelize.Sequelize):ITables {
  const tables:ITables = {
    users: seq.import(path.join(__dirname, './users')),
    transform: seq.import(path.join(__dirname, './transform')),
  };
  return tables;
};
