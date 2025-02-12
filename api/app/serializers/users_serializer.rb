class UsersSerializer < ActiveModel::Serializer
  attributes :id, :email, :username

  # Map the database primary key id if it's not default or required customization
  def id
    object.id
  end
end
