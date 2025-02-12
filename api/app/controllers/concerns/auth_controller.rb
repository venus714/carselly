class AuthController < ApplicationController
    skip_before_action :authorized, only: [:create]

 # app/controllers/auth_controller.rb
def create
    user = User.find_by(email: params[:user][:email])
  
    if user && user.authenticate(params[:user][:password])
      token = JsonWebToken.encode(user_id: user.id)
      render json: { token: token }, status: :ok  # Changed from :accepted (202) to :ok (200)
    else
      render json: { error: "Invalid credentials" }, status: :unauthorized
    end
  end
  

    private

    def user_login_params
      params.require(:user).permit(:email, :password)
    end
    
end
