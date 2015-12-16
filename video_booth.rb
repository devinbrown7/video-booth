
class VideoBooth < Sinatra::Base

  register Sinatra::Twitter::Bootstrap::Assets

  set :public_folder => "public", :static => true

  get "/" do
    # start streaming
    erb :home
  end

  get "/start" do

    # start recording and streaming
    # get video filename
    # set filename to a variable

    content_type :json
    { :video_name => "video_name_string" }.to_json
  end

  get "/stop" do

    # stops recording video

    content_type :json
    { :video_name => "video_name_string" }.to_json
  end

  get "/send" do

    # get email address(es)
    # get video name

    # send email(s)

    content_type :json
    { :video_name => "video_name_string" }.to_json
  end

end
