require "sinatra/activerecord"
#require "models/user.rb"

class VideoBooth < Sinatra::Base

  register Sinatra::ActiveRecordExtension
  set :database, {adapter: "sqlite3", database: "video_booth.sqlite3"}

  set :server, 'webrick'

  #register Sinatra::Twitter::Bootstrap::Assets

  set :public_folder => "public", :static => true

  get "/" do
    erb :home
  end
  #Add this to start.  This is a Modular App
  run! if app_file == $0

end
