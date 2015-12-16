
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

  post "/send" do

    video_file = ""
    email_addresses = []

    params.each do |param, value|
      if param.include? 'email_input_'
        email_addresses.push value
      elsif param == 'video_file'
        video_file = value
      end
    end

    # send email(s)

    content_type :json
    { :status => "success" }.to_json
  end

end
