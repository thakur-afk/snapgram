export const INavLink = {
  imgURL: "",
  route: "",
  label: "",
};

export const IUpdateUser = {
  userId: "",
  name: "",
  bio: "",
  imageId: "",
  imageUrl: URL | "",
  file: [],
};

export const INewPost = {
  userId: "",
  caption: "",
  file: [],
  location: "",
  tags: "",
};

export const IUpdatePost = {
  postId: "",
  caption: "",
  imageId: "",
  imageUrl: URL,
  file: [],
  location: "",
  tags: "",
};

export const IUser = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

export const INewUser = {
  name: "",
  email: "",
  username: "",
  password: "",
};
