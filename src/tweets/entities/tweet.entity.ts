import { Table, Column, Model } from 'sequelize-typescript';

//modelando a tabela

@Table({
  tableName: 'tweets',
})

//coluna adicionada na tabela
export class Tweet extends Model {
  @Column
  text: string;
}

//sqlite
//biblioteca de persistencia de dados
