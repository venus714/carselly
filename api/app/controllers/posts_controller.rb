class PostsController < ApplicationController
  before_action :set_post, only: %i[show edit update destroy]

  # GET /posts or /posts.json
  def index
    @posts = Post.all
  end

  # GET /posts/1 or /posts/1.json
  def show
    Rails.logger.info "Fetching post with ID: #{@post.id}"
    
    render json: @post.as_json(include: :images).merge(
      images: @post.images.map { |image| url_for(image) }
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
    Rails.logger.info "Received parameters: #{params.inspect}" # Debugging log
  
    @post = Post.new(post_params) # Use the filtered parameters
  
    if params[:images].present?
      params[:images].each do |image|
        @post.images.attach(image) unless image.blank?
      end
    end
  
    if @post.save
      Rails.logger.info "Post created successfully with ID: #{@post.id}"
      render json: @post, status: :created, location: @post
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
      render :show, status: :ok, location: @post
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
    respond_to do |format|
      format.html { redirect_to posts_path, status: :see_other, notice: "Post was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def post_params
    params.require(:post).permit(:title, images: [])
  end
  
end
