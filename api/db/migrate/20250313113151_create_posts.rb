class CreatePosts < ActiveRecord::Migration[7.2]
  def change
    create_table :posts do |t|
      # t.string :title, null: false
      t.string :model, null: false
      t.integer :year_of_manufacture, null: false
      t.string :condition, null: false
      t.string :color_in, null: false
      t.string :color_out, null: false
      t.string :registered, null: false
      t.integer :mileage, null: false
      t.string :transmission, null: false
      t.string :body, null: false
      t.string :fuel, null: false
      t.integer :engine_size, null: false
      t.integer :horse_power, null: false
      t.text :description, null: false
      t.decimal :price, precision: 10, scale: 2, null: false
      t.string :location, null: false
      t.string :contact, null: false
      t.string :name, null: false
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
