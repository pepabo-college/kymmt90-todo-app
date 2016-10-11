class AddDeadlineToTask < ActiveRecord::Migration[5.0]
  def change
    add_column :tasks, :deadline, :datetime
  end
end
