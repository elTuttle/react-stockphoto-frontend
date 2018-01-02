class AddUsernameToCaptions < ActiveRecord::Migration[5.1]
  def change
    add_column :captions, :username, :string
  end
end
