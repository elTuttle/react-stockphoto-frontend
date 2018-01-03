class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :create

  def login
    redirect_to "/auth/twitter"
  end

  def create
    @user = User.find_or_create_from_auth_hash(auth_hash)
    session[:user_id] = @user.id

    redirect_to "http://localhost:3000/user/#{@user.token}"
  end

  def current_user_page
    @user = User.find_by(token: params[:token])
    render json: @user
  end

  def destroy
    if current_user
      session.delete(:user_id)
      flash[:success] = "Sucessfully logged out!"
    end
    redirect_to root_path
  end

  def auth_hash
    request.env['omniauth.auth']
  end
end
