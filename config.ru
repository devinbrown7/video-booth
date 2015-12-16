# Load path and gems/bundler
$LOAD_PATH << File.expand_path(File.dirname(__FILE__))

require "bundler"
Bundler.require

# Local config
require "find"

# %w{config/initializers lib}.each do |load_path|
#   Find.find(load_path) { |f|
#     require f unless f.match(/\/\..+$/) || File.directory?(f)
#   }
# end

%w{config/initializers lib app}.each do |dir|
  Dir["#{File.dirname(__FILE__)}/#{dir}/**/*.rb"].each { |f| require(f) }
end

require 'sinatra/base'
require 'sinatra/twitter-bootstrap'
require 'json'

# Load app
require "video_booth"
run VideoBooth
