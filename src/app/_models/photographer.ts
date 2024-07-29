export interface Photographer{
  id: string;
  userName: string;
  profilePhotoUrl: string;
  firstName: string;
  lastName: string;
  created: Date;
  lastActive: Date;
  city: string;
  state: string;
  introduction: string;
  lookingFor: string;
  country: string;
  interests: string;
  // photos: Photo[];
}
