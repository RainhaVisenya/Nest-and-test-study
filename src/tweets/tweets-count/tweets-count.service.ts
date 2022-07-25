import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { Cache } from 'cache-manager';
import { Tweet } from '../entities/tweet.entity';

@Injectable()
export class TweetsCountService {
  // private limit = 10;
  // constructor(
  //   @InjectModel(Tweet)
  //   private tweetModel: typeof Tweet,
  //   @Inject(CACHE_MANAGER)
  //   private cacheManager: Cache,
  // ) {}
  // @Interval(5000)
  // async countTweets() {
  //   console.log('searching tweets');
  //   let offset = await this.cacheManager.get<number>('tweet-offset');
  //   offset = offset === undefined ? 0 : offset;
  //   console.log(`offsets: ${offset}`);
  //   const tweets = await this.tweetModel.findAll({
  //     offset,
  //     limit: this.limit,
  //   });
  //   console.log(`${tweets.length} found`);
  //   if (tweets.length === this.limit) {
  //     this.cacheManager.set('tweet-offset', offset + this.limit, {
  //       ttl: 1 * 60 * 10,
  //     });
  //     console.log(`found + ${this.limit} tweets`);
  //   }
  // }
}
