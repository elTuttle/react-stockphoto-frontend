class CreateCurrentImages < ActiveRecord::Migration[5.1]
  def change
    create_table :current_images do |t|
      t.integer :value

      t.timestamps
    end
  end
end
