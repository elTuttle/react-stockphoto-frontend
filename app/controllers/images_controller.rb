require 'open-uri'

class ImagesController < ApplicationController

  def all_captions
    @image = Image.find(params[:id])
    @captions = @image.captions.order(votes: :desc)
    render json: @captions
  end

  def new
    randompage = Random.rand(100000)
    stockpageUrl = "https://www.shutterstock.com/search/Portrait?page=#{randompage}&searchterm=Portrait&language=en"

    doc = Nokogiri::HTML(open(stockpageUrl))

    imageArray = []

    doc.css(".main-container .body-content .search-results .search-content .search-results-grid li .img-wrap img").each do |image|
      src = image.attribute("src").value
      imageArray << src
    end

    randomImageNumber = Random.rand(imageArray.length)

    imageUrl = "https:" + imageArray[randomImageNumber]

    puts imageUrl

    @image = Image.create(url: imageUrl)
    redirect_to image_path(@image)
  end

  def show
    @image = Image.find(params[:id])
    render json: @image
  end

  def current
    @image = Image.all.last
    render json: @image
  end

end
