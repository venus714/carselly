class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session 
    # before_action :authorized
    # include Pundit::Authorization
  
    def encode_token(payload)
      JWT.encode(payload, 'secret', 'HS256') # Ensure the algorithm is specified
    end
  
    def auth_header
      request.headers['Authorization']
    end
  
    def decoded_token
      if auth_header
        token = auth_header.split(' ')[1]
        begin 
          JWT.decode(token, 'secret', true, algorithm: 'HS256')
        rescue JWT::DecodeError
          return nil
        end
      end
    end
  
    def current_user 
      if decoded_token
        user_id = decoded_token[0]['user_id']
        @current_user ||= User.find_by(id: user_id)
      end
    end
  
    def logged_in?
      !!current_user
    end
  
    def authorized 
      render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
    end
  end
  