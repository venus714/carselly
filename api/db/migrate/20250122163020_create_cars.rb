class CreateCars < ActiveRecord::Migration[7.2]
  
  def change
    create_table :cars do |t|
      t.string :model
      t.string :Year_of_manufucture
      t.string :condition
      t.string :color_in
      t.string :color_out
      t.string :registered
      t.string :milage
      t.string :transmission
      t.string :body
      t.string :fuel
      t.string :engine_size
      t.string :horse_power
      t.string :description
      t.string :price
      t.string :location
      t.string :contact
      t.string :name
      t.string :email
      t.string :password_digest

      t.timestamps
    end
  end
end
