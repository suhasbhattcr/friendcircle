import { UserDto } from "./dto/user.dto";

export interface IFriendsservice {
  fetchAllUserProfiles: () => {};
  fetchUserFriendsById: (param:UserDto) => {};
  fetchUserFriendsOfFriendsById: (param:UserDto) => {};
}
