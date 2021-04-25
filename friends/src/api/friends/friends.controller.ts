import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { IFriendsservice } from './friends.interface';

@ApiTags('Friends')
@Controller('v1')
export class FriendsController {
  constructor(
    @Inject('IFriendsService') private readonly friendsService: IFriendsservice,
  ) {}

  @Get('allUsers')
  @ApiOperation({
    summary: 'Fetches all available users',
  })
  fetchAllUserProfiles() {
    return this.friendsService.fetchAllUserProfiles();
  }

  @Get('allFriends/:userId')
  @ApiOperation({
    summary: 'Fetches all friends of a user',
  })
  fetchUserFriendsById(@Param() param:UserDto) {
    return this.friendsService.fetchUserFriendsById(param);
  }

  @Get('friendsOfFriends/:userId')
  @ApiOperation({
    summary: 'Fetches all friends of friends',
  })
  fetchUserFriendsOfFriendsById(@Param() param:UserDto) {
    return this.friendsService.fetchUserFriendsOfFriendsById(param);
  }
}
