import { Injectable } from '@nestjs/common';
import { JwtService } from  '@nestjs/jwt';
import { UserService } from  '../user/user.service';
import { User } from  '../models/user.entity';
import  Chatkit, { AuthenticationResponse } from  '@pusher/chatkit-server';

@Injectable()
export class AuthService {

    chatkit: Chatkit;
    constructor(
      private readonly userService: UserService,
      private readonly jwtService: JwtService
    ) {
      this.chatkit = new Chatkit({
        instanceLocator: "YOUR_INSTANCE_LOCATOR",
        key: "YOUR_SECRET_KEY"
      })    
    }
    private async createUser(userData: User): Promise<User>{
        return this.userService.create(userData).then((user: User) =>{
          const userId = `${user.name}${user.id}`;
          const roomId = "YOUR_ROOM_ID";
          const avatarURL = "https://image.flaticon.com/icons/png/128/149/149071.png";
          
          return this.chatkit.createUser({id: userId, 
             name: user.name,
             avatarURL: avatarURL
          }).then(()=>{
    
            return this.chatkit.addUsersToRoom({ roomId: roomId,
              userIds: [userId]}).then(()=>{
                return user;
            });
    
          })
    
        });
    }

    public getToken(userId:  string): AuthenticationResponse {
        return this.chatkit.authenticate({ userId: userId });
    }

    private async validateUser(userData: User): Promise<User> {
        return await this.userService.findByEmail(userData.email);
    }

    public async login(user: User): Promise<any | {status: number}>{
        return this.validateUser(user).then((userInfo)=>{
          if(!userInfo){
            return { status: 404 };
          }
          let userId = `${userInfo.name}${userInfo.id}`;
          const accessToken = this.jwtService.sign(userId);
          return {
             expires_in: 3600,
             access_token: accessToken,
             user_id: userId,
             status: 200
          };
    
        });
    }
    
    public async register(user: User): Promise<any>{
        return this.createUser(user)
    }

}
