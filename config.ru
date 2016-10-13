# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

USERS = { ENV['USER'] => ENV['PASS'] }
use Rack::Auth::Digest::MD5, '', '' do |user|
  USERS[user]
end

run Rails.application
