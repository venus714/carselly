class Post < ApplicationRecord
    has_many_attached :images # Attach multiple images
     belongs_to :user
  
    validates :title, :model, :year_of_manufacture, :condition, :color_in, 
              :color_out, :registered, :mileage, :transmission, :body, 
              :fuel, :engine_size, :horse_power, :description, :price, 
              :location, :contact, :name, presence: true
  end
  