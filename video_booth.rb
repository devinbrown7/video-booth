
class VideoBooth < Sinatra::Base

  register Sinatra::Twitter::Bootstrap::Assets

  set :public_folder => "public", :static => true

  get "/" do
    erb :home
  end

end
