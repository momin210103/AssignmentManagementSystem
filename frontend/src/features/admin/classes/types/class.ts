export interface Class {
  id: string;
  name: string;
  section: string;
}

export interface CreateClassRequest {
  name: string;
  section: string;
}

export interface Student {
  id: string;
  fullName: string;
  email: string;
}
