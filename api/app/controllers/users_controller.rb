class UsersController < ApplicationController
  # skip_before_action :authorized, only: [:register]

  def register 
    @user = User.new(user_params)
    if @user.save
      token = encode_token(user_id: @user.id)
      render json: { user: UserSerializer.new(@user), jwt: token }, status: :created 
    else 
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def me
    if current_user
      render json: current_user
    else
      render json: { error: 'Not logged in' }, status: :unauthorized
    end
  end

  def index
    users = User.all
    render json: users
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
