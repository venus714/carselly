class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :model, :year_of_manufacture, :condition, 
             :color_in, :color_out, :registered, :mileage, 
             :transmission, :body, :fuel, :engine_size, 
             :horse_power, :description, :price, :location, 
             :contact, :name, :created_at, :updated_at, :images

  def images
    object.images.map { |image| Rails.application.routes.url_helpers.rails_blob_url(image, only_path: true) }
  end
end
