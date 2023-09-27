interface UserI {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

interface LoginUserI {
  email: string;
  password: string;
}

export { UserI, LoginUserI };
