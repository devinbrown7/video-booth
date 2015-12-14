require_relative "spec_helper"
require_relative "../video_booth.rb"

def app
  VideoBooth
end

describe VideoBooth do
  it "responds with a welcome message" do
    get '/'

    last_response.body.must_include 'Welcome to the Sinatra Template!'
  end
end
