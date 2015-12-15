require "sinatra/activerecord/rake"

namespace :db do
  task :load_config do
    require "./video_booth"
  end
end




%w{ bundler find rake/testtask}.each { |lib| require lib }

task :default => :spec

Rake::TestTask.new(:spec) do |t|
  t.test_files = FileList['spec/*_spec.rb']
end
