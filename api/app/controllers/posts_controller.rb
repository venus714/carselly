class PostsController < ApplicationController
  before_action :set_post, only: %i[show edit update destroy]


  def index
    @posts = Post.all
  
    render json: @posts.map { |post|
      post.as_json.merge(
        images: post.images.map { |image| url_for(image) }.uniq
      )
    }
  end
  
  def show
    render json: @post.as_json.merge(
      images: @post.images.map { |image| url_for(image) }.uniq
    )
  end
  

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
  end

  # POST /posts or /posts.json
  def create
    Rails.logger.info "Received parameters: #{params.inspect}"
  
    @post = Post.new(post_params)
  
    if @post.save
      Rails.logger.info "Post created successfully with ID: #{@post.id}"
      render json: @post.as_json.merge(
        images: @post.images.map { |image| url_for(image) }
      ), status: :created
    else
      Rails.logger.error "Failed to create post: #{@post.errors.full_messages}"
      render json: @post.errors, status: :unprocessable_entity
    end
  end
  
  
  
  # PATCH/PUT /posts/1 or /posts/1.json
  def update
    Rails.logger.info "Updating post with ID: #{@post.id} with params: #{params.inspect}"

    if @post.update(post_params)
      Rails.logger.info "Post updated successfully"
      render json: @post.as_json(include: :images).merge(
        images: @post.images.map { |image| url_for(image) }
      ), status: :ok
    else
      Rails.logger.error "Failed to update post: #{@post.errors.full_messages}"
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1 or /posts/1.json
  def destroy
    Rails.logger.info "Deleting post with ID: #{@post.id}"

    @post.destroy!
    
    Rails.logger.info "Post deleted successfully"
    head :no_content
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def post_params
    params.require(:post).permit(
      :title, :model, :year_of_manufacture, :condition, 
      :color_in, :color_out, :registered, :mileage, 
      :transmission, :body, :fuel, :engine_size, 
      :horse_power, :description, :price, :location, 
      :contact, :name, images: []
    )
  end
end
