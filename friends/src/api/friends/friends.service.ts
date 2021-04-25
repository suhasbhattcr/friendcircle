import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { IFriendsservice } from './friends.interface';
import { Pool } from 'pg';

const pool = new Pool({
  host: 'rosie.db.elephantsql.com',
  port: 5432,
  database: 'rsyzcvqi',
  user: 'rsyzcvqi',
  password: 'dAFKrc-sbMIu13EppobvbMfUGqpV4vN7',
  idleTimeoutMillis: 10000,
  max: 50,
});

@Injectable()
export class FriendsService implements IFriendsservice {
  async fetchAllUserProfiles() {
    return (
      await pool.query('select firstname,lastname,avatar from public.user')
    ).rows;
  }

  async fetchUserFriendsById(param: UserDto) {
    let query = `SELECT userid,firstname,lastname,avatar
    FROM public.user
    INNER JOIN public.friend
    ON public.user.id= public.friend.userid
    Where public.friend.userid = ${param.userId}`;
    const result = (await pool.query(query)).rows;
    return result;
  }

  async fetchUserFriendsOfFriendsById(param: UserDto) {
    let result = await this.fetchUserFriendsById(param);
    result.map(async (friend) => {
      friend.friends = await this.fetchUserFriendsById({
        userId: friend.userid,
      });
    });
    return result;
  }
}
