export interface UserLogin {
  email: string;
  password?: string;
}

export interface ICartItem {
  id: string;
  dish: string;
  price: number;
  qnty?: number;
  imgdata: string;
}

export interface ProfileInfo extends UserLogin {
  user: any;
  displayName: string;
  photoUrl?: string;
  occupation?: string;
}
