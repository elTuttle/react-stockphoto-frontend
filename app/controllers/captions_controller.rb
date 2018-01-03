class CaptionsController < ApplicationController

  def create
    image = Image.find_by(id: params[:image_id])
    @caption = image.captions.build()
    @caption.user_id = params[:user_id]
    @caption.username = params[:user_name]
    @caption.image_id = params[:image_id]
    @caption.content = params[:content]
    @caption.votes = 0
    @caption.save
    redirect_to caption_path(@caption)
  end

  def show
    @caption = Caption.find(params[:id])
    render json: @caption
  end

  def cast_vote
    @caption = Caption.find_by(content: params[:img])
    @user = User.find_by(token: params[:token])
    @caption.votes += 1;
    @user.votes -= 1;
    @caption.save
    @user.save
  end

end
