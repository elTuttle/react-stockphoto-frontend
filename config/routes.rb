Rails.application.routes.draw do
  resources :captions
  root to: "images#current"
  resources :images
  get '/current', to: 'images#current'
  get '/auth/:provider/callback', to: 'sessions#create'
  get '/current_user/:token', to: 'sessions#current_user_page'
  get '/login', to: 'sessions#login'
  get '/:id/all_captions', to: 'images#all_captions'
  delete '/logout', to: 'sessions#destroy'
  post '/cast_vote', to: 'captions#cast_vote'
  scope :auth do
    get 'is_signed_in', to: 'auth#is_signed_in?'
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
