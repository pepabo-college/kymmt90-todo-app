class Task < ApplicationRecord
  include RankedModel
  ranks :row_order

  enum status: { todo: 0, doing: 1, done: 2 }
  validates :content, presence: true

  scope :unfinished, -> { where(status: :todo).or(where(status: :doing)) }
end
