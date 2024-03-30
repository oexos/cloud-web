export interface Data {
  id: number;
  name: string;
}

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  hobby: string;
  age: number;
}

export interface Family {
  id: number;
  lastName: string;
  members: Person[];
}
