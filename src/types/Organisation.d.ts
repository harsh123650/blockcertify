export interface Organisation {
  _id?: string;
  name: string;
  owner?: string;
  organisationType: string;
  contact: {
    email: string;
    phone?: string;
    address?: string;
  };
  establishedOn?: Date;
  website?: string;
}
