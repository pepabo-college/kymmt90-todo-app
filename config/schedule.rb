set :output, "/log/cron_log.log"
set :environment, :production

work_hour = (9..18).map { |h| "#{h}:00" }
every 1.hours, at: work_hour do
  rake "todo_tasks:check_overdues"
end
