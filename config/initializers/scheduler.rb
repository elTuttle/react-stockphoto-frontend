require 'open-uri'

require 'twitter'

client = Twitter::REST::Client.new do |config|
  config.consumer_key        = "LCSVANe84roekLzZLzfqCdhbr"
  config.consumer_secret     = "FoBEyOIuPrqKU7Gc301PaVlakYlnMD1FpVCTjaoMjxz7sZRfAH"
  config.access_token        = "946906427116879874-EDYbvZz1xWqSsGCpaJyOFumg3ZJ7dzF"
  config.access_token_secret = "4uVdqsY4LSp0sG6yqB5SUXspCuuTjnhDhL90xlIlpMIY7"
end

s = Rufus::Scheduler.singleton

s.every '30s' do

  if Image.all.last.captions != nil
    winningCaption = Image.all.last.captions.order(votes: :desc).first.content
    winningUser = Image.all.last.captions.order(votes: :desc).first.username
    lastImage =   open(Image.all.last.url)

    tweetString = "#{winningCaption} - @#{winningUser}"

    client.update_with_media(tweetString, lastImage)
  end

  randompage = Random.rand(100000)
  stockpageUrl = "https://www.shutterstock.com/search/Portrait?page=#{randompage}&searchterm=Portrait&language=en"

  doc = Nokogiri::HTML(open(stockpageUrl))

  imageArray = []

  doc.css(".main-container .body-content .search-results .search-content .search-results-grid li .img-wrap img").each do |image|
    src = image.attribute("src").value
    imageArray << src
  end

  randomImageNumber = Random.rand(imageArray.length)

  imageUrl = "http:" + imageArray[randomImageNumber]

  Image.create(url: imageUrl)

  User.all.each do |user|
    user.update(votes: 3)
  end
end
