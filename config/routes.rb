Rails.application.routes.draw do
  resources :tasks do
    put :sort
  end
  root to: 'welcome#index'
end
