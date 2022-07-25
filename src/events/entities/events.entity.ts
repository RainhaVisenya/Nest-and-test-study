import { Table, Column, Model } from 'sequelize-typescript';

//modelando a tabela

@Table({
  tableName: 'events',
})
export class Event extends Model<Event> {
  @Column
  name: string;

  @Column
  date: string;
}

//sqlite
//biblioteca de persistencia de dados
