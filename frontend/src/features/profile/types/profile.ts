export interface ProfileClass {
  id: string;
  name: string;
  section: string;
}

export interface ProfileSubject {
  id: string;
  name: string;
}

export interface MyProfile {
  id: string;
  fullName: string;
  email: string;
  role: string;

  class: ProfileClass | null;

  classes: ProfileClass[];

  subjects: ProfileSubject[];
}
