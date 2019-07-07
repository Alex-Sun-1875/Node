// tslint:disable
import * as Sequelize from 'sequelize';


// table: users
export interface usersAttribute {
  user_id:number;
  password:string;
  user_name?:string;
}
export interface usersInstance extends Sequelize.Instance<usersAttribute>, usersAttribute { }
export interface usersModel extends Sequelize.Model<usersInstance, usersAttribute> { }

// table: transform
export interface transformAttribute {
  id:number;
  origin:string;
  target?:string;
}
export interface transformInstance extends Sequelize.Instance<transformAttribute>, transformAttribute { }
export interface transformModel extends Sequelize.Model<transformInstance, transformAttribute> { }
