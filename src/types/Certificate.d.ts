import { Organisation } from "./Organisation";
import { User } from "./User";

export interface Certificate {
  _id?: string;
  certificateId: string;
  issuer: User;
  issuingOrganisation: Organisation;
  issuedTo: {
    name: string;
    email?: string;
    contact?: string;
  };
  certificateDetails: {
    title: string;
    description?: string;
    category: "Academic" | "Employment" | "Legal" | "Other";
  };
  issuedOn: Date;
}
