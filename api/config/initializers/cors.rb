Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3001' # Change this to your frontend domain for security
    resource '*', headers: :any, methods: [:get, :post, :patch, :put, :delete, :options]
  end
end
