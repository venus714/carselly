Rails.application.routes.draw do
  resources :posts

  # Authentication
  post '/login', to: 'auth#create'
  post '/register', to: 'users#register'
  get '/me', to: 'users#me'

  # Users
  resources :users, only: [:index]

  # Cars
  get '/cars', to: 'cars#show'
  delete '/cars/:id', to: 'cars#destroy'
end
