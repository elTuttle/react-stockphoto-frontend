class AddVotesToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :votes, :integer
  end
end
