class AddDefaultValueToVotes < ActiveRecord::Migration[5.1]
  def change
    change_column :users, :votes, :integer, default: 3
  end
end
