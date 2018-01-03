# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

use Rack::Cors do
  allow do
    origins 'localhost:3000', '127.0.0.1:3000'
            # regular expressions can be used here

    resource '*', :headers => 'x-domain-token'
    resource '*',
        :methods => [:get, :post, :put, :delete, :options]
        # headers to expose
  end

  allow do
    origins '*'
    resource '*', :headers => :any, :methods => :get
  end
end

run Rails.application
