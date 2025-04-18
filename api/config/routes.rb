Rails.application.routes.draw do
  resources :posts
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # Defines the root path route ("/")
  # root "posts#index"
  resources :users, only: [:index, :create]
  post '/login', to: 'auth#create'
  post '/register', to: 'users#register'
  get '/me', to: 'users#me'
  get '/users', to: 'users#index'
  get '/car', to: 'posts#show'
  get '/cars', to: 'cars#show'
  get '/possts', to: 'posts#index'
  post '/possts', to: 'posts#create'
   delete '/cars/:id', to: 'cars#destroy'
end
