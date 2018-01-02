class CreateCaptions < ActiveRecord::Migration[5.1]
  def change
    create_table :captions do |t|
      t.integer :user_id
      t.integer :image_id
      t.text :content
      t.integer :votes

      t.timestamps
    end
  end
end
