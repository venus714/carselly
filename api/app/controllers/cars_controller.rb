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
    Rails.logger.debug "Received params: #{params.inspect}" # Debugging logs
    
    car = Car.new(car_params)

    if car.save
      car.images.attach(params[:car][:images]) if params[:car][:images].present?
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
    car = Car.find_by(id: params[:id])
    
    if car
      car.destroy
      render json: { message: 'Car deleted successfully' }, status: :ok
    else
      render json: { error: 'Car not found' }, status: :not_found
    end
  end
  private

  # Find a car by ID
  def set_car
    @car = Car.find_by(id: params[:id]) || Car.find_by(model: params.dig(:car, :model))
    
    unless @car
      render json: { error: 'Car not found' }, status: :not_found
    end
  end

  # Strong parameters
  def car_params
  params.permit(
    :model, :year_of_manufacture, :condition, :color_in, :color_out, :registered, 
    :mileage, :transmission, :body, :fuel, :engine_size, :horse_power, :description, 
    :price, :location, :contact, :name, images: []
  )

  rescue ActionController::ParameterMissing => e
    render json: { error: e.message }, status: :bad_request
  end
end
