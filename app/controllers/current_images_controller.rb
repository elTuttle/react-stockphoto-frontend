class CurrentImagesController < ApplicationController

  def current
    if @currentImage = CurrentImage.find_by(id: 1)
      puts(Time.now)
      if @image = Image.find_by(id: @currentImage.value)
        redirect_to image_path(@image)
      else
        redirect_to new_image_path
      end
    else
      @currentImage = CurrentImage.create(value: 1)
      if @image = Image.find_by(id: @currentImage.value)
        redirect_to image_path(@image)
      else
        redirect_to new_image_path
      end
    end
  end
end
