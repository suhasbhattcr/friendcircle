import { Injectable } from '@nestjs/common';
import { pool } from 'src/config/db.config';
import { UserDto } from './dto/user.dto';
import { IFriendsservice } from './friends.interface';

@Injectable()
export class FriendsService implements IFriendsservice {
  async fetchAllUserProfiles() {
    let query = 'select id,firstname,lastname,avatar from public.user';
    let result = await pool.query(query);
    return result.rows;
  }

  async fetchUserFriendsById(param: UserDto) {
    let query = `select id, firstname, lastname, avatar from public.user where public.user.id in (select public.friend.friendid from public.friend where public.friend.userid = ${param.userId})`;
    const result = (await pool.query(query)).rows;
    return result;
  }

  async fetchUserFriendsOfFriendsById(param: UserDto) {
    let result = await this.fetchUserFriendsById(param);
    for (let idx = 0; idx < result.length; idx++) {
      result[idx].friends = await this.fetchUserFriendsById({
        userId: result[idx].id,
      });
    }
    return result;
  }
}
