require 'rails_helper'

describe Task do
  it "is valid with a content, status" do
    task = Task.new(
      content: "歯を磨く",
      status: :todo
    )
    expect(task).to be_valid
  end

  it "is invalid without a content" do
    task = Task.new(
      content: nil
    )
    expect(task).not_to be_valid
  end

  it "のステータスに誤った数字が入っている" do
    expect{Task.new(status: 3)}.to raise_error(ArgumentError)
  end
end
