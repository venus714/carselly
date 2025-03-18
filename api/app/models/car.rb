class Car < ApplicationRecord
    has_many_attached :images
    validates :model, presence: true
    # validates :year_of_manufucture, presence: true
    validates :price, numericality: { greater_than: 0 }, allow_nil: true
   
  end
  