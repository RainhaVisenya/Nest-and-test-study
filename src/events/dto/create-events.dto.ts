export class CreateEventsDto {
  name: string;
  date: string;

  constructor(event?: Partial<CreateEventsDto>) {
    this.name = event?.name;
    this.date = event?.date;
  }
}

// DTO = data transfer object. É um objeto que define como a informação vai ser enviada
// pelo network.
