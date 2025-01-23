class CarsController < ApplicationController
    before_action :set_car, only: [:show, :update, :destroy]
  
    # Create a new car
    def create
        car = Car.new(car_params)
          
        if car.save
          if params[:images]
            car.images.attach(params[:images])
          end
      
          render json: { message: 'Car created successfully', car: car }, status: :created
        else
          render json: { errors: car.errors.full_messages }, status: :unprocessable_entity
        end
      end
      
  
    # Update an existing car
    def update
      if @car.update(car_params)
        render json: { message: 'Car updated successfully', car: @car }, status: :ok
      else
        render json: { errors: @car.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    # Delete a car
    def destroy
      @car.destroy
      render json: { message: 'Car deleted successfully' }, status: :ok
    end
  
    # Retrieve a car by ID
    def show
      render json: @car
    end
  
    private
  
    # Find a car by ID
    def set_car
      @car = Car.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Car not found' }, status: :not_found
    end
  
    # Strong parameters
    def car_params
      params.require(:car).permit(
        :model, :Year_of_manufucture, :condition, :color_in, :color_out, :registered, 
        :milage, :transmission, :body, :fuel, :engine_size, :horse_power, :description, 
        :price, :location, :contact, :name, :email, :password_digest
      )
    end
  end
  