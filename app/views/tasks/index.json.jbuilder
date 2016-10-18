json.array!(@tasks) do |task|
  json.extract! task, :id, :content, :status, :deadline, :memo
  json.url task_url(task, format: :json)
end
