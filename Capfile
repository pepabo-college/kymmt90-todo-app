# Load DSL and set up stages
require "capistrano/setup"

require 'capistrano/deploy'

require 'capistrano/bundler'
require 'capistrano/rails/assets'
require 'capistrano/puma'
require 'capistrano/rbenv'
Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }
