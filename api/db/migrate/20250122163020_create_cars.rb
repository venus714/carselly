class CreateCars < ActiveRecord::Migration[7.2]
  def change
    create_table :cars do |t|
      t.string :model
      t.integer :year_of_manufacture
      t.string :condition
      t.string :color_in
      t.string :color_out
      t.boolean :registered
      t.integer :mileage
      t.string :transmission
      t.string :body
      t.string :fuel
      t.integer :engine_size
      t.integer :horse_power
      t.string :description
      t.integer :price
      t.string :location
      t.string :contact
      t.string :name

      t.timestamps
    end
  end
end
