class CarsController < ApplicationController
  before_action :set_car, only: [:show, :update, :destroy]

  # Retrieve all cars
  def index
    cars = Car.all
    render json: { message: 'Cars retrieved successfully', data: cars }, status: :ok
  end

  # Retrieve a car by ID
  def show
    render json: { message: 'Car retrieved successfully', data: @car }, status: :ok
  end

  # Create a new car
  def create
    car = Car.new(car_params)

    if car.save
      # Attach images if present
      car.images.attach(params[:images]) if params[:images]
      render json: { message: 'Car created successfully', data: car }, status: :created
    else
      render json: { message: 'Car creation failed', errors: car.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Update an existing car
  def update
    if @car.update(car_params)
      render json: { message: 'Car updated successfully', data: @car }, status: :ok
    else
      render json: { message: 'Car update failed', errors: @car.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Delete a car
  def destroy
    @car.destroy
    render json: { message: 'Car deleted successfully' }, status: :ok
  end

  private

  # Find a car by ID
  def set_car
    @car = if params[:id]
             Car.find(params[:id])
           elsif params[:car]
             Car.find_by(model: params[:car][:model]) # Add other attributes if needed
           end
  
    render json: { error: 'Car not found' }, status: :not_found unless @car
  end
  

  # Strong parameters
  def car_params
    params.require(:car).permit(
      :model, :Year_of_manufucture, :condition, :color_in, :color_out, :registered, 
      :milage, :transmission, :body, :fuel, :engine_size, :horse_power, :description, 
      :price, :location, :contact, :name, :email, :password_digest, images: []
    )
  end
end
