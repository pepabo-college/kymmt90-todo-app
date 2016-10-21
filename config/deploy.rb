# config valid only for current version of Capistrano
lock '3.6.1'

# config valid only for current version of Capistrano
set :application, 'rails'
set :repo_url, "https://github.com/pepabo-college/kymmt90-todo-app.git"

set :user, 'centos'
set :branch, 'master'

set :default_env, { path: "/home/centos/.rbenv/bin:/home/centos/.rbenv/shims:$PATH" }
set :bundle_jobs, 8

set :puma_init_active_record, true
set :puma_bind, "unix://#{shared_path}/tmp/sockets/puma.sock"
set :sidekiq_role, :app
set :normalize_asset_timestamps, %w{public/images public/javascripts public/stylesheets}

set :rbenv_type, :system
set :rbenv_ruby, '2.3.1'
set :rbenv_map_bins, %w{rake gem bundle ruby rails}
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

SSHKit.config.umask = '002'
