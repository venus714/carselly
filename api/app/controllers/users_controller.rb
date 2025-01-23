class UsersController < ApplicationController
    skip_before_action :authorized, only: [:register]

    def register
        @user = User.create(user_params)
        if @user.valid?
            token = encode_token(user_id: @user.id)
            render json: { user: UsersSerializer.new(@user), jwt: token }, status: :created
        else
            render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end
      
    def me
        render json: current_user
    end
    def index
        @users = User.all
        render json: @users
    end
    private

    def user_params
        params.require(:user).permit(:username, :email, :password)
      end
      
end

 